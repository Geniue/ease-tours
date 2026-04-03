<?php

namespace App\Filament\Resources\EmbassyResource\Pages;

use App\Filament\Resources\EmbassyResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Actions;

class ListEmbassies extends ListRecords
{
    protected static string $resource = EmbassyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
