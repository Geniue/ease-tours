<?php

namespace App\Filament\Resources\ClientTransactionResource\Pages;

use App\Filament\Resources\ClientTransactionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditClientTransaction extends EditRecord
{
    protected static string $resource = ClientTransactionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
