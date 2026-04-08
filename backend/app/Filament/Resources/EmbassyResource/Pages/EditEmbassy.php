<?php

namespace App\Filament\Resources\EmbassyResource\Pages;

use App\Filament\Resources\EmbassyResource;
use App\Services\IndexNowService;
use Filament\Resources\Pages\EditRecord;

class EditEmbassy extends EditRecord
{
    protected static string $resource = EmbassyResource::class;

    protected function afterSave(): void
    {
        app(IndexNowService::class)->submitEmbassyPages();
    }
}
