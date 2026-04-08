<?php

namespace App\Filament\Resources\BlogResource\Pages;

use App\Filament\Resources\BlogResource;
use App\Services\IndexNowService;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateBlog extends CreateRecord
{
    protected static string $resource = BlogResource::class;

    protected function afterCreate(): void
    {
        app(IndexNowService::class)->submitBlog($this->record);
    }
}
