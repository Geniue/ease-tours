<?php

namespace App\Filament\Resources\EmailReachoutResource\Pages;

use App\Filament\Resources\EmailReachoutResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewEmailReachout extends ViewRecord
{
    protected static string $resource = EmailReachoutResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('back')
                ->label('Back to reachouts')
                ->url(EmailReachoutResource::getUrl('index'))
                ->color('gray'),
        ];
    }
}
