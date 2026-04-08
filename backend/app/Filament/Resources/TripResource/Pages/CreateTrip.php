<?php

namespace App\Filament\Resources\TripResource\Pages;

use App\Filament\Resources\TripResource;
use App\Services\IndexNowService;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateTrip extends CreateRecord
{
    protected static string $resource = TripResource::class;

    protected function afterCreate(): void
    {
        app(IndexNowService::class)->submitTrip($this->record);
    }
}
