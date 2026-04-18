<?php

namespace App\Filament\Widgets;

use App\Models\ClientTransaction;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class AccountingStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $total      = ClientTransaction::count();
        $done       = ClientTransaction::where('status', 'done')->count();
        $waiting    = ClientTransaction::where('status', 'waiting')->count();
        $lost       = ClientTransaction::where('status', 'lost')->count();

        $totalRevenue  = ClientTransaction::where('status', 'done')->sum('sell_price');
        $totalProfit   = ClientTransaction::where('status', 'done')->sum('profit');
        $collected     = ClientTransaction::sum('current_money');
        $pendingRevenue = ClientTransaction::where('status', 'waiting')->sum('sell_price');

        $profitMargin = $totalRevenue > 0
            ? round(($totalProfit / $totalRevenue) * 100, 1)
            : 0;

        return [
            Stat::make('Total Clients', $total)
                ->description("{$done} done · {$waiting} waiting · {$lost} lost")
                ->descriptionIcon('heroicon-m-users')
                ->color('primary'),

            Stat::make('Total Revenue (Done)', 'EGP ' . number_format($totalRevenue, 0))
                ->description("Profit margin: {$profitMargin}%")
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),

            Stat::make('Total Profit (Done)', 'EGP ' . number_format($totalProfit, 0))
                ->description('Net: sell price − net price')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('success'),

            Stat::make('Money Collected', 'EGP ' . number_format($collected, 0))
                ->description('Deposits & advance payments received')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('info'),

            Stat::make('Pending Revenue', 'EGP ' . number_format($pendingRevenue, 0))
                ->description("{$waiting} deals still waiting")
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'),

            Stat::make('Lost Deals', $lost)
                ->description('Deals marked as lost')
                ->descriptionIcon('heroicon-m-x-circle')
                ->color('danger'),
        ];
    }
}
