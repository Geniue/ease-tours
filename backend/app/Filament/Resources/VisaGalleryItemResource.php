<?php

namespace App\Filament\Resources {

    use App\Filament\Resources\VisaGalleryItemResource\Pages;
    use App\Models\Governorate;
    use App\Models\VisaGalleryItem;
    use Closure;
    use Filament\Forms;
    use Filament\Forms\Form;
    use Filament\Forms\Get;
    use Filament\Resources\Resource;
    use Filament\Tables;
    use Filament\Tables\Table;

    class VisaGalleryItemResource extends Resource
    {
        protected static ?string $model = VisaGalleryItem::class;

        protected static ?string $navigationIcon = 'heroicon-o-photo';

        protected static ?string $navigationGroup = 'Content';

        protected static ?string $navigationLabel = 'Visa Gallery';

        protected static ?string $modelLabel = 'Visa Gallery Item';

        protected static ?string $pluralModelLabel = 'Visa Gallery';

        protected static ?int $navigationSort = 6;

        public static function form(Form $form): Form
        {
            return $form
                ->schema([
                    Forms\Components\Section::make('Public SEO Content')
                        ->columns(3)
                        ->schema([
                            Forms\Components\TextInput::make('country_ar')
                                ->label('Country (Arabic)')
                                ->required()
                                ->maxLength(255),
                            Forms\Components\TextInput::make('country_en')
                                ->label('Country (English)')
                                ->maxLength(255),
                            Forms\Components\Select::make('region')
                                ->label('Region')
                                ->options(self::regionOptions())
                                ->native(false),
                            Forms\Components\TextInput::make('visa_type_ar')
                                ->label('Visa Type (Arabic)')
                                ->required()
                                ->maxLength(255),
                            Forms\Components\TextInput::make('visa_type_en')
                                ->label('Visa Type (English)')
                                ->maxLength(255),
                            Forms\Components\TextInput::make('processing_days')
                                ->label('Processing Days')
                                ->numeric()
                                ->minValue(0),
                            Forms\Components\TextInput::make('city_ar')
                                ->label('Client City (Arabic)')
                                ->required()
                                ->maxLength(255),
                            Forms\Components\TextInput::make('city_en')
                                ->label('Client City (English)')
                                ->maxLength(255),
                            Forms\Components\Select::make('governorate_id')
                                ->label('Governorate')
                                ->options(fn () => Governorate::query()
                                    ->orderBy('sort_order')
                                    ->pluck('name_en', 'id')
                                    ->toArray())
                                ->searchable()
                                ->preload(),
                            Forms\Components\Select::make('processed_month')
                                ->label('Processed Month')
                                ->options(self::monthOptions())
                                ->native(false),
                            Forms\Components\TextInput::make('processed_year')
                                ->label('Processed Year')
                                ->numeric()
                                ->minValue(2000)
                                ->maxValue(2100),
                        ]),

                    Forms\Components\Section::make('Public Image')
                        ->columns(2)
                        ->schema([
                            Forms\Components\FileUpload::make('image_path')
                                ->label('Redacted Visa Image')
                                ->image()
                                ->directory('visa-gallery')
                                ->disk('public')
                                ->visibility('public')
                                ->maxSize(5120)
                                ->required()
                                ->helperText('Upload only a redacted public-safe image. Hide names, passport numbers, MRZ, QR codes, visa numbers, dates of birth, and personal identifiers before publishing.'),
                            Forms\Components\Textarea::make('alt_ar')
                                ->label('Alt Text (Arabic)')
                                ->rows(3),
                            Forms\Components\Textarea::make('alt_en')
                                ->label('Alt Text (English)')
                                ->rows(3),
                        ]),

                    Forms\Components\Section::make('SEO Copy')
                        ->columns(2)
                        ->schema([
                            Forms\Components\TextInput::make('title_ar')
                                ->label('Title (Arabic)')
                                ->maxLength(255),
                            Forms\Components\TextInput::make('title_en')
                                ->label('Title (English)')
                                ->maxLength(255),
                            Forms\Components\TextInput::make('slug_ar')
                                ->label('Slug (Arabic)')
                                ->unique(ignoreRecord: true)
                                ->maxLength(255),
                            Forms\Components\TextInput::make('slug_en')
                                ->label('Slug (English)')
                                ->unique(ignoreRecord: true)
                                ->maxLength(255),
                            Forms\Components\Textarea::make('summary_ar')
                                ->label('Summary (Arabic)')
                                ->rows(4),
                            Forms\Components\Textarea::make('summary_en')
                                ->label('Summary (English)')
                                ->rows(4),
                        ]),

                    Forms\Components\Section::make('Publishing & Compliance')
                        ->columns(3)
                        ->schema([
                            Forms\Components\Toggle::make('is_redacted')
                                ->label('Image is redacted')
                                ->helperText('Required before publishing.'),
                            Forms\Components\Toggle::make('has_client_consent')
                                ->label('Client consent received')
                                ->helperText('Required before publishing.'),
                            Forms\Components\Toggle::make('is_featured')
                                ->label('Featured'),
                            Forms\Components\Toggle::make('is_published')
                                ->label('Published')
                                ->rule(self::publishingComplianceRule()),
                            Forms\Components\TextInput::make('sort_order')
                                ->numeric()
                                ->default(0),
                            Forms\Components\DateTimePicker::make('published_at')
                                ->label('Published At')
                                ->seconds(false),
                        ]),
                ]);
        }

        public static function table(Table $table): Table
        {
            return $table
                ->columns([
                    Tables\Columns\ImageColumn::make('image_path')
                        ->label('Image')
                        ->disk('public')
                        ->square(),
                    Tables\Columns\TextColumn::make('country_ar')
                        ->label('Country')
                        ->searchable()
                        ->sortable(),
                    Tables\Columns\TextColumn::make('visa_type_ar')
                        ->label('Visa Type')
                        ->searchable()
                        ->sortable(),
                    Tables\Columns\TextColumn::make('city_ar')
                        ->label('City')
                        ->searchable()
                        ->sortable(),
                    Tables\Columns\TextColumn::make('governorate.name_en')
                        ->label('Governorate')
                        ->sortable(),
                    Tables\Columns\TextColumn::make('region')
                        ->badge()
                        ->formatStateUsing(fn (?string $state): string => $state ? (self::regionOptions()[$state] ?? $state) : 'None')
                        ->sortable(),
                    Tables\Columns\IconColumn::make('is_redacted')
                        ->boolean()
                        ->label('Redacted'),
                    Tables\Columns\IconColumn::make('has_client_consent')
                        ->boolean()
                        ->label('Consent'),
                    Tables\Columns\IconColumn::make('is_published')
                        ->boolean()
                        ->label('Published'),
                    Tables\Columns\IconColumn::make('is_featured')
                        ->boolean()
                        ->label('Featured'),
                    Tables\Columns\TextColumn::make('processed_year')
                        ->label('Processed')
                        ->formatStateUsing(function (?int $state, VisaGalleryItem $record): ?string {
                            if (!$state) {
                                return null;
                            }

                            return $record->processed_month
                                ? sprintf('%02d/%d', $record->processed_month, $state)
                                : (string) $state;
                        })
                        ->sortable(),
                    Tables\Columns\TextColumn::make('updated_at')
                        ->dateTime()
                        ->sortable()
                        ->toggleable(),
                ])
                ->defaultSort('sort_order')
                ->reorderable('sort_order')
                ->filters([
                    Tables\Filters\TernaryFilter::make('is_published')
                        ->label('Published'),
                    Tables\Filters\TernaryFilter::make('is_featured')
                        ->label('Featured'),
                    Tables\Filters\SelectFilter::make('region')
                        ->options(self::regionOptions()),
                    Tables\Filters\SelectFilter::make('governorate_id')
                        ->label('Governorate')
                        ->relationship('governorate', 'name_en')
                        ->searchable()
                        ->preload(),
                    Tables\Filters\SelectFilter::make('country_ar')
                        ->label('Country')
                        ->options(fn () => VisaGalleryItem::query()
                            ->whereNotNull('country_ar')
                            ->distinct()
                            ->orderBy('country_ar')
                            ->pluck('country_ar', 'country_ar')
                            ->toArray())
                        ->searchable(),
                    Tables\Filters\SelectFilter::make('processed_year')
                        ->label('Processed Year')
                        ->options(fn () => VisaGalleryItem::query()
                            ->whereNotNull('processed_year')
                            ->distinct()
                            ->orderByDesc('processed_year')
                            ->pluck('processed_year', 'processed_year')
                            ->toArray()),
                ])
                ->actions([
                    Tables\Actions\ViewAction::make(),
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
                'index' => Pages\ManageVisaGalleryItems::route('/'),
            ];
        }

        private static function regionOptions(): array
        {
            return [
                'schengen' => 'Schengen',
                'gulf' => 'Gulf',
                'asia' => 'Asia',
                'africa' => 'Africa',
                'america' => 'America',
                'europe' => 'Europe',
                'other' => 'Other',
            ];
        }

        private static function monthOptions(): array
        {
            return [
                1 => 'January',
                2 => 'February',
                3 => 'March',
                4 => 'April',
                5 => 'May',
                6 => 'June',
                7 => 'July',
                8 => 'August',
                9 => 'September',
                10 => 'October',
                11 => 'November',
                12 => 'December',
            ];
        }

        private static function publishingComplianceRule(): Closure
        {
            return function (Get $get): Closure {
                return function (string $attribute, mixed $value, Closure $fail) use ($get): void {
                    if (!$value) {
                        return;
                    }

                    if (!$get('is_redacted') || !$get('has_client_consent') || !$get('image_path')) {
                        $fail('Publishing requires a redacted image, confirmed client consent, and an uploaded public-safe image.');
                    }
                };
            };
        }
    }
}

namespace App\Filament\Resources\VisaGalleryItemResource\Pages {

    use App\Filament\Resources\VisaGalleryItemResource;
    use Filament\Actions;
    use Filament\Resources\Pages\ManageRecords;

    class ManageVisaGalleryItems extends ManageRecords
    {
        protected static string $resource = VisaGalleryItemResource::class;

        protected function getHeaderActions(): array
        {
            return [
                Actions\CreateAction::make(),
            ];
        }
    }
}
