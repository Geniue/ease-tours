<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GovernorateResource\Pages;
use App\Models\Governorate;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class GovernorateResource extends Resource
{
    protected static ?string $model = Governorate::class;

    protected static ?string $navigationIcon = 'heroicon-o-map-pin';

    protected static ?string $navigationGroup = 'Content';

    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Info')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('name_ar')
                            ->label('Name (Arabic)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('name_en')
                            ->label('Name (English)')
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
                        Forms\Components\TextInput::make('capital_ar')
                            ->label('Capital City (Arabic)')
                            ->required(),
                        Forms\Components\TextInput::make('capital_en')
                            ->label('Capital City (English)')
                            ->required(),
                        Forms\Components\TextInput::make('region_ar')
                            ->label('Region (Arabic)'),
                        Forms\Components\TextInput::make('region_en')
                            ->label('Region (English)'),
                    ]),

                Forms\Components\Section::make('Map Coordinates')
                    ->description('Enter the latitude/longitude of the governorate capital for the embedded Google Map.')
                    ->columns(3)
                    ->schema([
                        Forms\Components\TextInput::make('latitude')
                            ->label('Latitude')
                            ->numeric()
                            ->required()
                            ->step(0.0000001),
                        Forms\Components\TextInput::make('longitude')
                            ->label('Longitude')
                            ->numeric()
                            ->required()
                            ->step(0.0000001),
                        Forms\Components\TextInput::make('map_zoom')
                            ->label('Map Zoom Level')
                            ->numeric()
                            ->default(12)
                            ->minValue(5)
                            ->maxValue(18),
                    ]),

                Forms\Components\Section::make('Quick Facts')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('population')
                            ->label('Population'),
                        Forms\Components\TextInput::make('area_km2')
                            ->label('Area (km²)'),
                    ]),

                Forms\Components\Section::make('SEO Meta')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('meta_title_ar')
                            ->label('Meta Title (Arabic)')
                            ->maxLength(70),
                        Forms\Components\TextInput::make('meta_title_en')
                            ->label('Meta Title (English)')
                            ->maxLength(70),
                        Forms\Components\Textarea::make('meta_description_ar')
                            ->label('Meta Description (Arabic)')
                            ->rows(2)
                            ->maxLength(160),
                        Forms\Components\Textarea::make('meta_description_en')
                            ->label('Meta Description (English)')
                            ->rows(2)
                            ->maxLength(160),
                    ]),

                Forms\Components\Section::make('Excerpt')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Textarea::make('excerpt_ar')
                            ->label('Excerpt (Arabic)')
                            ->rows(3),
                        Forms\Components\Textarea::make('excerpt_en')
                            ->label('Excerpt (English)')
                            ->rows(3),
                    ]),

                Forms\Components\Section::make('Content')
                    ->schema([
                        Forms\Components\RichEditor::make('body_ar')
                            ->label('Body (Arabic)')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('body_en')
                            ->label('Body (English)')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('FAQs')
                    ->description('Add frequently asked questions for FAQ schema markup.')
                    ->schema([
                        Forms\Components\Repeater::make('faqs')
                            ->label('')
                            ->schema([
                                Forms\Components\TextInput::make('question_ar')
                                    ->label('Question (Arabic)')
                                    ->required(),
                                Forms\Components\TextInput::make('question_en')
                                    ->label('Question (English)')
                                    ->required(),
                                Forms\Components\Textarea::make('answer_ar')
                                    ->label('Answer (Arabic)')
                                    ->required()
                                    ->rows(3),
                                Forms\Components\Textarea::make('answer_en')
                                    ->label('Answer (English)')
                                    ->required()
                                    ->rows(3),
                            ])
                            ->columns(2)
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['question_en'] ?? null)
                            ->addActionLabel('Add FAQ')
                            ->defaultItems(0),
                    ]),

                Forms\Components\Section::make('Media & Publishing')
                    ->columns(2)
                    ->schema([
                        Forms\Components\FileUpload::make('featured_image')
                            ->label('Featured Image (Card)')
                            ->image()
                            ->directory('governorates')
                            ->disk('public')
                            ->visibility('public')
                            ->maxSize(5120),
                        Forms\Components\FileUpload::make('cover_image')
                            ->label('Cover Image (Hero Banner)')
                            ->image()
                            ->directory('governorates')
                            ->disk('public')
                            ->visibility('public')
                            ->maxSize(5120),
                        Forms\Components\Toggle::make('is_published')
                            ->label('Published'),
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Featured'),
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')
                    ->label('Image')
                    ->disk('public')
                    ->circular(),
                Tables\Columns\TextColumn::make('name_en')
                    ->label('Governorate')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('name_ar')
                    ->label('الاسم')
                    ->searchable(),
                Tables\Columns\TextColumn::make('capital_en')
                    ->label('Capital')
                    ->sortable(),
                Tables\Columns\TextColumn::make('region_en')
                    ->label('Region')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean()
                    ->label('Published'),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Published'),
                Tables\Filters\SelectFilter::make('region_en')
                    ->label('Region')
                    ->options([
                        'Greater Cairo' => 'Greater Cairo',
                        'Nile Delta' => 'Nile Delta',
                        'Alexandria' => 'Alexandria',
                        'Suez Canal' => 'Suez Canal',
                        'Upper Egypt' => 'Upper Egypt',
                        'Western Desert' => 'Western Desert',
                        'Sinai' => 'Sinai',
                    ]),
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
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGovernorates::route('/'),
            'create' => Pages\CreateGovernorate::route('/create'),
            'edit' => Pages\EditGovernorate::route('/{record}/edit'),
        ];
    }
}
