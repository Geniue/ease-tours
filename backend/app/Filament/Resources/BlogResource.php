<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogResource\Pages;
use App\Filament\Resources\BlogResource\RelationManagers;
use App\Models\Blog;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class BlogResource extends Resource
{
    protected static ?string $model = Blog::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Content';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Info')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('category_id')
                            ->label('Category')
                            ->options(fn (): array => Category::query()
                                ->orderBy('sort_order')
                                ->pluck('name_en', 'id')
                                ->all())
                            ->native(true)
                            ->required(),
                        Forms\Components\Select::make('direction')
                            ->options([
                                'rtl' => 'RTL (Arabic)',
                                'ltr' => 'LTR (English)',
                            ])
                            ->default('rtl')
                            ->required(),
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

                Forms\Components\Section::make('Media & Publishing')
                    ->columns(2)
                    ->schema([
                        Forms\Components\FileUpload::make('featured_image')
                            ->image()
                            ->directory('blogs')
                            ->disk('public')
                            ->visibility('public')
                            ->maxSize(5120),
                        Forms\Components\Group::make([
                            Forms\Components\Toggle::make('is_published')
                                ->label('Published'),
                            Forms\Components\DateTimePicker::make('published_at')
                                ->label('Publish Date'),
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
                    ->disk('public')
                    ->circular(),
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category.name_en')
                    ->label('Category')
                    ->sortable(),
                Tables\Columns\TextColumn::make('direction')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'rtl' => 'info',
                        'ltr' => 'success',
                        default => 'gray',
                    }),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean()
                    ->label('Published'),
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')
                    ->relationship('category', 'name_en')
                    ->label('Category'),
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Published'),
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
            'index' => Pages\ListBlogs::route('/'),
            'create' => Pages\CreateBlog::route('/create'),
            'edit' => Pages\EditBlog::route('/{record}/edit'),
        ];
    }
}
