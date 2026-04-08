<?php

namespace App\Filament\Resources\BlogResource\Pages;

use App\Filament\Resources\BlogResource;
use App\Services\IndexNowService;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditBlog extends EditRecord
{
    protected static string $resource = BlogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function afterSave(): void
    {
        app(IndexNowService::class)->submitBlog($this->record);
    }
}
