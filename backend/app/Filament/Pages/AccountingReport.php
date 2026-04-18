<?php

namespace App\Filament\Pages;

use App\Models\ClientTransaction;
use Filament\Pages\Page;
use Illuminate\Support\Facades\DB;

class AccountingReport extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-document-chart-bar';

    protected static ?string $navigationGroup = 'Accounting';

    protected static ?string $navigationLabel = 'Accounting Report';

    protected static ?string $title = 'Accounting Report';

    protected static ?int $navigationSort = 2;

    protected static string $view = 'filament.pages.accounting-report';

    public function getViewData(): array
    {
        // --- Summary ---
        $summary = [
            'total'           => ClientTransaction::count(),
            'done'            => ClientTransaction::where('status', 'done')->count(),
            'waiting'         => ClientTransaction::where('status', 'waiting')->count(),
            'lost'            => ClientTransaction::where('status', 'lost')->count(),
            'total_revenue'   => ClientTransaction::where('status', 'done')->sum('sell_price'),
            'total_profit'    => ClientTransaction::where('status', 'done')->sum('profit'),
            'total_collected' => ClientTransaction::sum('current_money'),
            'pending_revenue' => ClientTransaction::where('status', 'waiting')->sum('sell_price'),
            'lost_revenue'    => ClientTransaction::where('status', 'lost')->sum('sell_price'),
        ];

        $summary['profit_margin'] = $summary['total_revenue'] > 0
            ? round(($summary['total_profit'] / $summary['total_revenue']) * 100, 1)
            : 0;

        $summary['collection_rate'] = $summary['total_revenue'] > 0
            ? round(($summary['total_collected'] / $summary['total_revenue']) * 100, 1)
            : 0;

        // --- By Service ---
        $byService = ClientTransaction::select(
            'service',
            DB::raw('COUNT(*) as count'),
            DB::raw('SUM(sell_price) as total_sell'),
            DB::raw('SUM(net_price) as total_net'),
            DB::raw('SUM(profit) as total_profit'),
            DB::raw('SUM(CASE WHEN status = "done" THEN 1 ELSE 0 END) as done_count'),
            DB::raw('SUM(CASE WHEN status = "waiting" THEN 1 ELSE 0 END) as waiting_count'),
            DB::raw('SUM(CASE WHEN status = "lost" THEN 1 ELSE 0 END) as lost_count')
        )
            ->groupBy('service')
            ->orderByDesc('total_profit')
            ->get();

        // --- By Month ---
        $byMonth = ClientTransaction::select(
            DB::raw('DATE_FORMAT(transaction_date, "%Y-%m") as month'),
            DB::raw('DATE_FORMAT(transaction_date, "%b %Y") as month_label'),
            DB::raw('COUNT(*) as count'),
            DB::raw('SUM(sell_price) as total_sell'),
            DB::raw('SUM(profit) as total_profit'),
            DB::raw('SUM(current_money) as total_collected'),
            DB::raw('SUM(CASE WHEN status = "done" THEN 1 ELSE 0 END) as done_count'),
            DB::raw('SUM(CASE WHEN status = "waiting" THEN 1 ELSE 0 END) as waiting_count')
        )
            ->whereNotNull('transaction_date')
            ->groupBy('month', 'month_label')
            ->orderBy('month')
            ->get();

        // --- Top Clients by Profit ---
        $topClients = ClientTransaction::select(
            'client_name',
            DB::raw('COUNT(*) as count'),
            DB::raw('SUM(profit) as total_profit'),
            DB::raw('SUM(sell_price) as total_sell'),
            DB::raw('SUM(current_money) as total_collected')
        )
            ->groupBy('client_name')
            ->orderByDesc('total_profit')
            ->limit(10)
            ->get();

        // --- Outstanding (done but not fully collected) ---
        $outstanding = ClientTransaction::where('status', 'done')
            ->whereNotNull('current_money')
            ->whereColumn('current_money', '<', 'sell_price')
            ->select(
                'id', 'client_name', 'service', 'transaction_date',
                'sell_price', 'current_money',
                DB::raw('(sell_price - current_money) as balance')
            )
            ->orderByDesc(DB::raw('sell_price - current_money'))
            ->get();

        $totalOutstanding = $outstanding->sum('balance');

        return compact(
            'summary',
            'byService',
            'byMonth',
            'topClients',
            'outstanding',
            'totalOutstanding'
        );
    }
}
