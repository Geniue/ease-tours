<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ClientTransactionResource\Pages;
use App\Imports\ClientTransactionImport;
use App\Models\ClientTransaction;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Maatwebsite\Excel\Facades\Excel;

class ClientTransactionResource extends Resource
{
    protected static ?string $model = ClientTransaction::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';

    protected static ?string $navigationGroup = 'Accounting';

    protected static ?string $navigationLabel = 'Transactions';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Transaction Details')
                ->columns(2)
                ->schema([
                    Forms\Components\DatePicker::make('transaction_date')
                        ->label('Date')
                        ->required(),
                    Forms\Components\TextInput::make('client_name')
                        ->label('Client')
                        ->required()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('service')
                        ->label('Service')
                        ->maxLength(255),
                    Forms\Components\Select::make('status')
                        ->options([
                            'waiting' => 'Waiting',
                            'done'    => 'Done',
                            'lost'    => 'Lost',
                        ])
                        ->default('waiting')
                        ->required(),
                    Forms\Components\DatePicker::make('follow_up_date')
                        ->label('Follow Up'),
                    Forms\Components\TextInput::make('current_money')
                        ->label('Current Money (Deposit)')
                        ->numeric()
                        ->prefix('EGP'),
                ]),
            Forms\Components\Section::make('Financials')
                ->columns(3)
                ->schema([
                    Forms\Components\TextInput::make('net_price')
                        ->label('Net Price (Cost)')
                        ->numeric()
                        ->required()
                        ->prefix('EGP')
                        ->default(0)
                        ->live(onBlur: true),
                    Forms\Components\TextInput::make('sell_price')
                        ->label('Sell Price')
                        ->numeric()
                        ->required()
                        ->prefix('EGP')
                        ->default(0)
                        ->live(onBlur: true),
                    Forms\Components\TextInput::make('profit')
                        ->label('Profit (Auto-calculated)')
                        ->prefix('EGP')
                        ->disabled()
                        ->dehydrated(false)
                        ->default(0)
                        ->formatStateUsing(fn ($state, Forms\Get $get) =>
                            (float) $get('sell_price') - (float) $get('net_price')
                        ),
                ]),
            Forms\Components\Textarea::make('notes')
                ->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('transaction_date', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('#')
                    ->sortable(),
                Tables\Columns\TextColumn::make('transaction_date')
                    ->label('Date')
                    ->date('d/m/Y')
                    ->sortable(),
                Tables\Columns\TextColumn::make('client_name')
                    ->label('Client')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('service')
                    ->searchable()
                    ->limit(30),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'success' => 'done',
                        'warning' => 'waiting',
                        'danger'  => 'lost',
                    ]),
                Tables\Columns\TextColumn::make('follow_up_date')
                    ->label('Follow Up')
                    ->date('d/m/Y')
                    ->sortable(),
                Tables\Columns\TextColumn::make('net_price')
                    ->label('Net')
                    ->money('EGP')
                    ->sortable(),
                Tables\Columns\TextColumn::make('sell_price')
                    ->label('Sell')
                    ->money('EGP')
                    ->sortable(),
                Tables\Columns\TextColumn::make('profit')
                    ->label('Profit')
                    ->money('EGP')
                    ->sortable()
                    ->color(fn ($record) => $record->profit > 0 ? 'success' : 'danger'),
                Tables\Columns\TextColumn::make('current_money')
                    ->label('Collected')
                    ->money('EGP')
                    ->sortable()
                    ->default('—'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'done'    => 'Done',
                        'waiting' => 'Waiting',
                        'lost'    => 'Lost',
                    ]),
                Tables\Filters\Filter::make('transaction_date')
                    ->form([
                        Forms\Components\DatePicker::make('from')->label('From'),
                        Forms\Components\DatePicker::make('until')->label('Until'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['from'], fn ($q, $v) => $q->whereDate('transaction_date', '>=', $v))
                            ->when($data['until'], fn ($q, $v) => $q->whereDate('transaction_date', '<=', $v));
                    }),
            ])
            ->headerActions([
                Tables\Actions\Action::make('import')
                    ->label('Import Sheet')
                    ->icon('heroicon-o-arrow-up-tray')
                    ->color('success')
                    ->form([
                        Forms\Components\FileUpload::make('file')
                            ->label('Upload Excel / CSV File')
                            ->helperText('Export your Google Sheet as .xlsx or .csv then upload here.')
                            ->acceptedFileTypes([
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                'application/vnd.ms-excel',
                                'text/csv',
                                'text/plain',
                            ])
                            ->storeFiles(false)
                            ->required(),
                        Forms\Components\Toggle::make('clear_existing')
                            ->label('Clear all existing records before import')
                            ->helperText('Enable this to replace all data with the new sheet.')
                            ->default(false),
                    ])
                    ->action(function (array $data): void {
                        if ($data['clear_existing']) {
                            ClientTransaction::truncate();
                        }

                        $import = new ClientTransactionImport();
                        // $data['file'] is a TemporaryUploadedFile (extends UploadedFile)
                        // maatwebsite/excel accepts it directly
                        Excel::import($import, $data['file']);

                        Notification::make()
                            ->title('Import successful')
                            ->body("Imported {$import->getImportedCount()} transactions.")
                            ->success()
                            ->send();
                    }),

                Tables\Actions\Action::make('report')
                    ->label('Accounting Report')
                    ->icon('heroicon-o-chart-bar')
                    ->color('info')
                    ->url(fn () => route('filament.admin.pages.accounting-report')),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListClientTransactions::route('/'),
            'create' => Pages\CreateClientTransaction::route('/create'),
            'edit'   => Pages\EditClientTransaction::route('/{record}/edit'),
        ];
    }
}
