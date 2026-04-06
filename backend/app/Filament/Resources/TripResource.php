<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TripResource\Pages;
use App\Filament\Resources\TripResource\RelationManagers;
use App\Models\Trip;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TripResource extends Resource
{
    protected static ?string $model = Trip::class;

    protected static ?string $navigationIcon = 'heroicon-o-globe-alt';

    protected static ?string $navigationGroup = 'Tourism';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Info')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('category_id')
                            ->relationship('category', 'name_en')
                            ->required()
                            ->searchable()
                            ->preload(),
                        Forms\Components\TextInput::make('duration_days')
                            ->label('Duration (Days)')
                            ->required()
                            ->numeric()
                            ->minValue(1),
                        Forms\Components\TextInput::make('title_ar')
                            ->label('Title (Arabic)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('title_en')
                            ->label('Title (English)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug_ar')
                            ->label('Slug (Arabic)')
                            ->required()
                            ->unique(ignoreRecord: true),
                        Forms\Components\TextInput::make('slug_en')
                            ->label('Slug (English)')
                            ->required()
                            ->unique(ignoreRecord: true),
                        Forms\Components\TextInput::make('destination_ar')
                            ->label('Destination (Arabic)')
                            ->required(),
                        Forms\Components\TextInput::make('destination_en')
                            ->label('Destination (English)')
                            ->required(),
                    ]),

                Forms\Components\Section::make('Description')
                    ->columns(2)
                    ->schema([
                        Forms\Components\RichEditor::make('description_ar')
                            ->label('Description (Arabic)')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('description_en')
                            ->label('Description (English)')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('itinerary_ar')
                            ->label('Itinerary (Arabic)')
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('itinerary_en')
                            ->label('Itinerary (English)')
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('inclusions_ar')
                            ->label('Inclusions (Arabic)')
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('inclusions_en')
                            ->label('Inclusions (English)')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Pricing & Dates')
                    ->columns(3)
                    ->schema([
                        Forms\Components\TextInput::make('base_price')
                            ->label('Base Price')
                            ->required()
                            ->numeric()
                            ->prefix('EGP'),
                        Forms\Components\TextInput::make('discounted_price')
                            ->label('Discounted Price')
                            ->numeric()
                            ->prefix('EGP'),
                        Forms\Components\TextInput::make('currency')
                            ->default('EGP')
                            ->maxLength(3)
                            ->required(),
                        Forms\Components\DatePicker::make('start_date'),
                        Forms\Components\DatePicker::make('end_date'),
                        Forms\Components\TextInput::make('max_participants')
                            ->numeric(),
                    ]),

                Forms\Components\Section::make('Media & Status')
                    ->columns(2)
                    ->schema([
                        Forms\Components\FileUpload::make('featured_image')
                            ->image()
                            ->directory('trips')
                            ->disk('public')
                            ->visibility('public')
                            ->imageEditor()
                            ->maxSize(5120),
                        Forms\Components\FileUpload::make('video')
                            ->label('Video')
                            ->directory('trips/videos')
                            ->disk('public')
                            ->visibility('public')
                            ->acceptedFileTypes(['video/mp4', 'video/webm', 'video/ogg'])
                            ->maxSize(102400)
                            ->helperText('Upload MP4/WebM video (max 100MB)'),
                        Forms\Components\FileUpload::make('video_thumbnail')
                            ->label('Video Thumbnail')
                            ->image()
                            ->directory('trips/video-thumbnails')
                            ->disk('public')
                            ->visibility('public')
                            ->imageEditor()
                            ->maxSize(5120)
                            ->helperText('Custom poster image for the video. Falls back to featured image.'),
                        Forms\Components\Group::make([
                            Forms\Components\Toggle::make('is_featured')
                                ->label('Featured Trip'),
                            Forms\Components\Toggle::make('is_active')
                                ->label('Active')
                                ->default(true),
                            Forms\Components\Toggle::make('coming_soon')
                                ->label('Coming Soon')
                                ->helperText('Enable when prices are not set yet'),
                        ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')
                    ->label('Image')
                    ->circular(),
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category.name_en')
                    ->label('Category')
                    ->sortable(),
                Tables\Columns\TextColumn::make('destination_en')
                    ->label('Destination')
                    ->searchable(),
                Tables\Columns\TextColumn::make('duration_days')
                    ->label('Days')
                    ->sortable(),
                Tables\Columns\TextColumn::make('base_price')
                    ->label('Price')
                    ->money('EGP')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
                Tables\Columns\IconColumn::make('coming_soon')
                    ->boolean()
                    ->label('Coming Soon'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')
                    ->relationship('category', 'name_en')
                    ->label('Category'),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active'),
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTrips::route('/'),
            'create' => Pages\CreateTrip::route('/create'),
            'edit' => Pages\EditTrip::route('/{record}/edit'),
        ];
    }
}
