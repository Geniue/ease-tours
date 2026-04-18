<?php

namespace App\Filament\Resources\ClientTransactionResource\Pages;

use App\Filament\Resources\ClientTransactionResource;
use App\Filament\Widgets\AccountingStatsWidget;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListClientTransactions extends ListRecords
{
    protected static string $resource = ClientTransactionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            AccountingStatsWidget::class,
        ];
    }
}
