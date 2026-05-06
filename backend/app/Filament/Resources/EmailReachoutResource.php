<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EmailReachoutResource\Pages;
use App\Models\Client;
use App\Models\ContactMessage;
use App\Models\EmailReachout;
use App\Models\Subscriber;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Collection;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class EmailReachoutResource extends Resource
{
    protected static ?string $model = EmailReachout::class;

    protected static ?string $navigationIcon = 'heroicon-o-paper-airplane';

    protected static ?string $navigationGroup = 'Operations';

    protected static ?string $navigationLabel = 'Email Reachouts';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Recipients')
                    ->description('Select who should receive this reachout. Every recipient receives an individual email.')
                    ->schema([
                        Forms\Components\CheckboxList::make('recipient_sources')
                            ->label('Recipient sources')
                            ->options([
                                'manual' => 'Manual email list',
                                'subscribers' => 'Active newsletter subscribers',
                                'clients' => 'Clients with email addresses',
                                'contact_messages' => 'Contact form emails',
                            ])
                            ->default(['manual'])
                            ->columns(2)
                            ->required(),
                        Forms\Components\Textarea::make('manual_recipients')
                            ->label('Manual recipients')
                            ->helperText('Separate emails with commas, semicolons, spaces, or new lines.')
                            ->rows(4)
                            ->visible(fn (Forms\Get $get): bool => in_array('manual', $get('recipient_sources') ?? [], true))
                            ->required(fn (Forms\Get $get): bool => in_array('manual', $get('recipient_sources') ?? [], true)),
                        Forms\Components\Placeholder::make('recipient_preview')
                            ->label('Recipient preview')
                            ->content(fn (Forms\Get $get): HtmlString => new HtmlString(
                                self::recipientPreview($get('recipient_sources') ?? [], $get('manual_recipients'))
                            )),
                    ]),
                Forms\Components\Section::make('Email')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('subject')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('reply_to')
                            ->label('Sender / reply-to email')
                            ->email()
                            ->default(EmailReachout::OPERATIONS_EMAIL)
                            ->disabled()
                            ->dehydrated()
                            ->helperText('Reachouts always send from operations@ease-travel.online.')
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('body')
                            ->required()
                            ->default(self::defaultCompanyReachoutBody())
                            ->helperText('Use this company-focused template as a starting point, then tailor the offer before sending.')
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'bulletList',
                                'orderedList',
                                'link',
                                'undo',
                                'redo',
                            ])
                            ->columnSpanFull(),
                    ]),
                Forms\Components\Section::make('Attachments')
                    ->schema([
                        Forms\Components\FileUpload::make('attachments')
                            ->label('Attach files')
                            ->helperText('Optional. Up to 5 files, 10 MB each. Stored privately and sent as email attachments.')
                            ->disk('local')
                            ->directory('email-reachouts/attachments')
                            ->multiple()
                            ->maxFiles(5)
                            ->maxSize(10240)
                            ->downloadable()
                            ->openable()
                            ->acceptedFileTypes([
                                'application/pdf',
                                'application/msword',
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                'application/vnd.ms-excel',
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                'application/vnd.ms-powerpoint',
                                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                'image/jpeg',
                                'image/png',
                                'image/webp',
                                'text/csv',
                                'text/plain',
                                'application/zip',
                            ])
                            ->getUploadedFileNameForStorageUsing(
                                fn (TemporaryUploadedFile $file): string => Str::uuid() . '-' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension()
                            ),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('subject')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(45),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'sent',
                        'danger' => 'failed',
                        'gray' => 'partial',
                    ]),
                Tables\Columns\TextColumn::make('recipient_count')
                    ->label('Recipients')
                    ->sortable(),
                Tables\Columns\TextColumn::make('sent_count')
                    ->label('Sent')
                    ->sortable(),
                Tables\Columns\TextColumn::make('failed_count')
                    ->label('Failed')
                    ->state(fn (EmailReachout $record): int => count($record->failed_recipients ?? []))
                    ->badge()
                    ->color(fn (int $state): string => $state > 0 ? 'danger' : 'success'),
                Tables\Columns\TextColumn::make('attachments')
                    ->label('Files')
                    ->state(fn (EmailReachout $record): int => count($record->attachments ?? []))
                    ->badge()
                    ->color('gray'),
                Tables\Columns\TextColumn::make('sent_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'sent' => 'Sent',
                        'partial' => 'Partial',
                        'failed' => 'Failed',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEmailReachouts::route('/'),
            'create' => Pages\CreateEmailReachout::route('/create'),
            'view' => Pages\ViewEmailReachout::route('/{record}'),
        ];
    }

    public static function recipientPreview(array $sources, ?string $manualRecipients): string
    {
        $recipients = self::resolveRecipients($sources, $manualRecipients);
        $count = count($recipients);

        if ($count === 0) {
            return '<span class="text-danger-600">No valid recipients selected yet.</span>';
        }

        return '<span class="text-success-600 font-medium">' . $count . ' unique recipient' . ($count === 1 ? '' : 's') . ' selected.</span>';
    }

    public static function resolveRecipients(array $sources, ?string $manualRecipients): array
    {
        $emails = collect();

        if (in_array('manual', $sources, true)) {
            $emails = $emails->merge(self::parseManualRecipients($manualRecipients));
        }

        if (in_array('subscribers', $sources, true)) {
            $emails = $emails->merge(
                Subscriber::query()
                    ->where('is_active', true)
                    ->pluck('email')
            );
        }

        if (in_array('clients', $sources, true)) {
            $emails = $emails->merge(
                Client::query()
                    ->whereNotNull('email')
                    ->where('email', '!=', '')
                    ->pluck('email')
            );
        }

        if (in_array('contact_messages', $sources, true)) {
            $emails = $emails->merge(
                ContactMessage::query()
                    ->whereNotNull('email')
                    ->where('email', '!=', '')
                    ->distinct()
                    ->pluck('email')
            );
        }

        return self::normalizeEmails($emails)->values()->all();
    }

    public static function parseManualRecipients(?string $value): array
    {
        return preg_split('/[\s,;]+/', $value ?? '', -1, PREG_SPLIT_NO_EMPTY) ?: [];
    }

    private static function defaultCompanyReachoutBody(): string
    {
        return <<<'HTML'
<p>Hello,</p>
<p>Ease Travel supports companies with reliable travel coordination for business trips, visas, flights, hotels, airport transfers, and group arrangements.</p>
<p>If your team has upcoming travel needs, we can prepare a tailored plan with clear options, timing, and next steps.</p>
<p><strong>Reply to this email with your destination, travel dates, and approximate number of travelers, and our operations team will follow up with a suitable proposal.</strong></p>
<p>Best regards,<br>Ease Travel Operations</p>
HTML;
    }

    private static function normalizeEmails(Collection $emails): Collection
    {
        return $emails
            ->map(fn (?string $email): string => Str::lower(trim((string) $email)))
            ->filter(fn (string $email): bool => filter_var($email, FILTER_VALIDATE_EMAIL) !== false)
            ->unique()
            ->values();
    }
}
