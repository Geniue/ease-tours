<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EmbassyResource\Pages;
use App\Models\Embassy;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EmbassyResource extends Resource
{
    protected static ?string $model = Embassy::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-library';

    protected static ?string $navigationGroup = 'Content';

    protected static ?string $navigationLabel = 'Embassies';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Country Info')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('country_name_ar')
                            ->label('Country (Arabic)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('country_name_en')
                            ->label('Country (English)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->helperText('URL-friendly identifier, e.g. spain, germany'),
                        Forms\Components\TextInput::make('flag_emoji')
                            ->label('Flag Emoji')
                            ->maxLength(10)
                            ->helperText('e.g. 🇪🇸 🇩🇪 🇮🇹'),
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                    ]),

                Forms\Components\Section::make('Appointment Status')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('appointment_status')
                            ->label('Status')
                            ->options([
                                'open' => '✅ Open - Accepting Appointments',
                                'closed' => '🔴 Closed - Not Accepting Now',
                                'stopped' => '⛔ Stopped - Until Further Notice',
                            ])
                            ->required()
                            ->default('closed'),
                        Forms\Components\DatePicker::make('next_open_date')
                            ->label('Next Open Date')
                            ->helperText('When appointments will open again'),
                        Forms\Components\DatePicker::make('next_close_date')
                            ->label('Next Close Date')
                            ->helperText('When current booking window closes'),
                        Forms\Components\TextInput::make('appointment_price')
                            ->label('Appointment Price')
                            ->numeric()
                            ->prefix('EGP')
                            ->helperText('Cost of the appointment/visa application'),
                        Forms\Components\TextInput::make('price_currency')
                            ->label('Currency')
                            ->default('EGP')
                            ->maxLength(10),
                    ]),

                Forms\Components\Section::make('Notes & Visa Info')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Textarea::make('notes_ar')
                            ->label('Notes (Arabic)')
                            ->rows(3)
                            ->helperText('General notes about this embassy'),
                        Forms\Components\Textarea::make('notes_en')
                            ->label('Notes (English)')
                            ->rows(3),
                        Forms\Components\Textarea::make('stopped_visas_ar')
                            ->label('Stopped Visas (Arabic)')
                            ->rows(3)
                            ->helperText('Which visa types are suspended'),
                        Forms\Components\Textarea::make('stopped_visas_en')
                            ->label('Stopped Visas (English)')
                            ->rows(3),
                    ]),

                Forms\Components\Section::make('Visibility')
                    ->schema([
                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('#')
                    ->sortable(),
                Tables\Columns\TextColumn::make('flag_emoji')
                    ->label('🏳️'),
                Tables\Columns\TextColumn::make('country_name_en')
                    ->label('Country')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('country_name_ar')
                    ->label('البلد')
                    ->searchable(),
                Tables\Columns\BadgeColumn::make('appointment_status')
                    ->label('Status')
                    ->colors([
                        'success' => 'open',
                        'danger' => 'closed',
                        'warning' => 'stopped',
                    ]),
                Tables\Columns\TextColumn::make('next_open_date')
                    ->label('Opens')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('next_close_date')
                    ->label('Closes')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('appointment_price')
                    ->label('Price')
                    ->money('EGP'),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->filters([
                Tables\Filters\SelectFilter::make('appointment_status')
                    ->options([
                        'open' => 'Open',
                        'closed' => 'Closed',
                        'stopped' => 'Stopped',
                    ]),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active'),
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
            'index' => Pages\ListEmbassies::route('/'),
            'create' => Pages\CreateEmbassy::route('/create'),
            'edit' => Pages\EditEmbassy::route('/{record}/edit'),
        ];
    }
}
