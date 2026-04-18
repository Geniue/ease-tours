<?php

namespace App\Filament\Resources\ClientResource\Pages;

use App\Filament\Resources\ClientResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditClient extends EditRecord
{
    protected static string $resource = ClientResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('view_profile')
                ->label('View Profile')
                ->icon('heroicon-o-user-circle')
                ->color('info')
                ->url(fn () => ViewClient::getUrl(['record' => $this->record])),
            Actions\DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return ViewClient::getUrl(['record' => $this->getRecord()]);
    }
}
