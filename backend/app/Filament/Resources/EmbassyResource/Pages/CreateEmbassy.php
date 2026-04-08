<?php

namespace App\Filament\Resources\EmbassyResource\Pages;

use App\Filament\Resources\EmbassyResource;
use App\Services\IndexNowService;
use Filament\Resources\Pages\CreateRecord;

class CreateEmbassy extends CreateRecord
{
    protected static string $resource = EmbassyResource::class;

    protected function afterCreate(): void
    {
        app(IndexNowService::class)->submitEmbassyPages();
    }
}
