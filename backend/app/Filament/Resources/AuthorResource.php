<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AuthorResource\Pages;
use App\Models\Author;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AuthorResource extends Resource
{
    protected static ?string $model = Author::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-circle';

    protected static ?string $navigationGroup = 'Content';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Identity')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('name_ar')
                            ->label('Name (Arabic)')
                            ->required()
                            ->maxLength(120),
                        Forms\Components\TextInput::make('name_en')
                            ->label('Name (English)')
                            ->required()
                            ->maxLength(120),
                        Forms\Components\TextInput::make('slug_ar')
                            ->label('Slug (Arabic)')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(160),
                        Forms\Components\TextInput::make('slug_en')
                            ->label('Slug (English)')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(160),
                        Forms\Components\TextInput::make('expertise_ar')
                            ->label('Expertise (Arabic)')
                            ->placeholder('e.g. خبير تأشيرات شنغن'),
                        Forms\Components\TextInput::make('expertise_en')
                            ->label('Expertise (English)')
                            ->placeholder('e.g. Schengen visa specialist'),
                    ]),

                Forms\Components\Section::make('Bio')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Textarea::make('bio_ar')
                            ->label('Bio (Arabic)')
                            ->rows(4),
                        Forms\Components\Textarea::make('bio_en')
                            ->label('Bio (English)')
                            ->rows(4),
                    ]),

                Forms\Components\Section::make('Photo & Contact')
                    ->columns(2)
                    ->schema([
                        Forms\Components\FileUpload::make('photo')
                            ->image()
                            ->avatar()
                            ->disk('public')
                            ->directory('authors')
                            ->visibility('public')
                            ->maxSize(4096),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->maxLength(160),
                        Forms\Components\TextInput::make('social_twitter')
                            ->label('Twitter / X URL')
                            ->url(),
                        Forms\Components\TextInput::make('social_linkedin')
                            ->label('LinkedIn URL')
                            ->url(),
                        Forms\Components\TextInput::make('social_facebook')
                            ->label('Facebook URL')
                            ->url(),
                        Forms\Components\Toggle::make('is_active')
                            ->default(true),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo')
                    ->disk('public')
                    ->circular(),
                Tables\Columns\TextColumn::make('name_en')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('expertise_en')
                    ->label('Expertise')
                    ->limit(30),
                Tables\Columns\TextColumn::make('blogs_count')
                    ->counts('blogs')
                    ->label('Posts'),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active'),
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAuthors::route('/'),
            'create' => Pages\CreateAuthor::route('/create'),
            'edit' => Pages\EditAuthor::route('/{record}/edit'),
        ];
    }
}
