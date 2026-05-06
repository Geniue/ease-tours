<?php

namespace App\Filament\Resources\EmailReachoutResource\Pages;

use App\Filament\Resources\EmailReachoutResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEmailReachouts extends ListRecords
{
    protected static string $resource = EmailReachoutResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->label('New reachout'),
        ];
    }
}
