<x-filament-panels::page>
    @php
        $data = $this->getViewData();
        $s    = $data['summary'];
    @endphp

    {{-- ═══════════════════════════════════════════ SUMMARY CARDS ══ --}}
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6 mb-8">
        @php
            $cards = [
                ['label' => 'Total Clients',    'value' => number_format($s['total']),                     'sub' => 'All transactions',            'color' => 'blue'],
                ['label' => 'Deals Done',        'value' => number_format($s['done']),                      'sub' => $s['total'] > 0 ? round($s['done']/$s['total']*100,1).'% of total' : '—', 'color' => 'green'],
                ['label' => 'Waiting',           'value' => number_format($s['waiting']),                   'sub' => 'EGP '.number_format($s['pending_revenue'],0).' potential', 'color' => 'yellow'],
                ['label' => 'Lost',              'value' => number_format($s['lost']),                      'sub' => 'EGP '.number_format($s['lost_revenue'],0).' lost revenue', 'color' => 'red'],
                ['label' => 'Total Revenue',     'value' => 'EGP '.number_format($s['total_revenue'],0),   'sub' => 'From completed deals',        'color' => 'indigo'],
                ['label' => 'Total Profit',      'value' => 'EGP '.number_format($s['total_profit'],0),    'sub' => $s['profit_margin'].'% margin', 'color' => 'emerald'],
            ];
        @endphp

        @foreach ($cards as $card)
            <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ $card['label'] }}</p>
                <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{{ $card['value'] }}</p>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ $card['sub'] }}</p>
            </div>
        @endforeach
    </div>

    {{-- ══════════════════════════════════════════ COLLECTION ROW ══ --}}
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
        <div class="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-5">
            <p class="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">Money Collected</p>
            <p class="mt-1 text-3xl font-bold text-green-700 dark:text-green-300">EGP {{ number_format($s['total_collected'], 0) }}</p>
            <p class="mt-1 text-sm text-green-600 dark:text-green-400">Collection rate: {{ $s['collection_rate'] }}% of done revenue</p>
        </div>
        <div class="rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 p-5">
            <p class="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">Outstanding Balance</p>
            <p class="mt-1 text-3xl font-bold text-orange-700 dark:text-orange-300">EGP {{ number_format($data['totalOutstanding'], 0) }}</p>
            <p class="mt-1 text-sm text-orange-600 dark:text-orange-400">{{ $data['outstanding']->count() }} clients with partial payment</p>
        </div>
        <div class="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-5">
            <p class="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">Pending Pipeline</p>
            <p class="mt-1 text-3xl font-bold text-blue-700 dark:text-blue-300">EGP {{ number_format($s['pending_revenue'], 0) }}</p>
            <p class="mt-1 text-sm text-blue-600 dark:text-blue-400">{{ $s['waiting'] }} deals in progress</p>
        </div>
    </div>

    {{-- ══════════════════════════════════════ BREAKDOWN BY SERVICE ══ --}}
    <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">Revenue by Service</h2>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        <th class="px-4 py-3">Service</th>
                        <th class="px-4 py-3 text-center">Total</th>
                        <th class="px-4 py-3 text-center">Done</th>
                        <th class="px-4 py-3 text-center">Waiting</th>
                        <th class="px-4 py-3 text-center">Lost</th>
                        <th class="px-4 py-3 text-right">Revenue</th>
                        <th class="px-4 py-3 text-right">Cost</th>
                        <th class="px-4 py-3 text-right">Profit</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    @foreach ($data['byService'] as $row)
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[200px] truncate" dir="rtl">
                                {{ $row->service ?: '—' }}
                            </td>
                            <td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{{ $row->count }}</td>
                            <td class="px-4 py-3 text-center">
                                <span class="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/40 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-300">{{ $row->done_count }}</span>
                            </td>
                            <td class="px-4 py-3 text-center">
                                <span class="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/40 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-300">{{ $row->waiting_count }}</span>
                            </td>
                            <td class="px-4 py-3 text-center">
                                <span class="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/40 px-2 py-0.5 text-xs font-medium text-red-700 dark:text-red-300">{{ $row->lost_count }}</span>
                            </td>
                            <td class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">EGP {{ number_format($row->total_sell, 0) }}</td>
                            <td class="px-4 py-3 text-right text-gray-500 dark:text-gray-400">EGP {{ number_format($row->total_net, 0) }}</td>
                            <td class="px-4 py-3 text-right font-semibold {{ $row->total_profit > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' }}">
                                EGP {{ number_format($row->total_profit, 0) }}
                            </td>
                        </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr class="bg-gray-50 dark:bg-gray-700/50 font-semibold text-gray-900 dark:text-white">
                        <td class="px-4 py-3">TOTAL</td>
                        <td class="px-4 py-3 text-center">{{ $data['byService']->sum('count') }}</td>
                        <td class="px-4 py-3 text-center text-green-600">{{ $data['byService']->sum('done_count') }}</td>
                        <td class="px-4 py-3 text-center text-yellow-600">{{ $data['byService']->sum('waiting_count') }}</td>
                        <td class="px-4 py-3 text-center text-red-600">{{ $data['byService']->sum('lost_count') }}</td>
                        <td class="px-4 py-3 text-right">EGP {{ number_format($data['byService']->sum('total_sell'), 0) }}</td>
                        <td class="px-4 py-3 text-right">EGP {{ number_format($data['byService']->sum('total_net'), 0) }}</td>
                        <td class="px-4 py-3 text-right text-green-600">EGP {{ number_format($data['byService']->sum('total_profit'), 0) }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

    {{-- ═══════════════════════════════════════ MONTHLY BREAKDOWN ══ --}}
    @if ($data['byMonth']->isNotEmpty())
    <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">Monthly Performance</h2>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        <th class="px-4 py-3">Month</th>
                        <th class="px-4 py-3 text-center">Transactions</th>
                        <th class="px-4 py-3 text-center">Done</th>
                        <th class="px-4 py-3 text-center">Waiting</th>
                        <th class="px-4 py-3 text-right">Revenue</th>
                        <th class="px-4 py-3 text-right">Profit</th>
                        <th class="px-4 py-3 text-right">Collected</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    @foreach ($data['byMonth'] as $row)
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ $row->month_label }}</td>
                            <td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{{ $row->count }}</td>
                            <td class="px-4 py-3 text-center text-green-600 dark:text-green-400 font-medium">{{ $row->done_count }}</td>
                            <td class="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400 font-medium">{{ $row->waiting_count }}</td>
                            <td class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">EGP {{ number_format($row->total_sell, 0) }}</td>
                            <td class="px-4 py-3 text-right font-semibold text-green-600 dark:text-green-400">EGP {{ number_format($row->total_profit, 0) }}</td>
                            <td class="px-4 py-3 text-right text-blue-600 dark:text-blue-400">EGP {{ number_format($row->total_collected, 0) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    @endif

    {{-- ═════════════════════════════════════ OUTSTANDING BALANCES ══ --}}
    @if ($data['outstanding']->isNotEmpty())
    <div class="rounded-xl border border-orange-200 dark:border-orange-800 bg-white dark:bg-gray-800 shadow-sm mb-8">
        <div class="px-6 py-4 border-b border-orange-200 dark:border-orange-700 flex items-center justify-between">
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">Outstanding Balances (Done — Partially Paid)</h2>
            <span class="text-sm font-semibold text-orange-600 dark:text-orange-400">Total: EGP {{ number_format($data['totalOutstanding'], 0) }}</span>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-orange-50 dark:bg-orange-900/20 text-left text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                        <th class="px-4 py-3">#</th>
                        <th class="px-4 py-3">Client</th>
                        <th class="px-4 py-3">Service</th>
                        <th class="px-4 py-3">Date</th>
                        <th class="px-4 py-3 text-right">Sell Price</th>
                        <th class="px-4 py-3 text-right">Collected</th>
                        <th class="px-4 py-3 text-right">Balance Due</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-orange-100 dark:divide-orange-900/30">
                    @foreach ($data['outstanding'] as $row)
                        <tr class="hover:bg-orange-50 dark:hover:bg-orange-900/10">
                            <td class="px-4 py-3 text-gray-500 dark:text-gray-400">{{ $row->id }}</td>
                            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ $row->client_name }}</td>
                            <td class="px-4 py-3 text-gray-600 dark:text-gray-400" dir="rtl">{{ $row->service }}</td>
                            <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ $row->transaction_date?->format('d/m/Y') }}</td>
                            <td class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">EGP {{ number_format($row->sell_price, 0) }}</td>
                            <td class="px-4 py-3 text-right text-green-600 dark:text-green-400">EGP {{ number_format($row->current_money, 0) }}</td>
                            <td class="px-4 py-3 text-right font-bold text-orange-600 dark:text-orange-400">EGP {{ number_format($row->balance, 0) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    @endif

    {{-- ═══════════════════════════════════════════ TOP CLIENTS ══ --}}
    <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">Top 10 Clients by Profit</h2>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        <th class="px-4 py-3">Rank</th>
                        <th class="px-4 py-3">Client</th>
                        <th class="px-4 py-3 text-center">Transactions</th>
                        <th class="px-4 py-3 text-right">Total Revenue</th>
                        <th class="px-4 py-3 text-right">Total Profit</th>
                        <th class="px-4 py-3 text-right">Collected</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    @foreach ($data['topClients'] as $i => $row)
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                            <td class="px-4 py-3">
                                <span class="inline-flex h-6 w-6 items-center justify-center rounded-full {{ $i < 3 ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 font-bold' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400' }} text-xs">
                                    {{ $i + 1 }}
                                </span>
                            </td>
                            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ $row->client_name }}</td>
                            <td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{{ $row->count }}</td>
                            <td class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">EGP {{ number_format($row->total_sell, 0) }}</td>
                            <td class="px-4 py-3 text-right font-semibold text-green-600 dark:text-green-400">EGP {{ number_format($row->total_profit, 0) }}</td>
                            <td class="px-4 py-3 text-right text-blue-600 dark:text-blue-400">EGP {{ number_format($row->total_collected ?? 0, 0) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    {{-- ══════════════════════════════════════════════════ FOOTER ══ --}}
    <p class="text-center text-xs text-gray-400 dark:text-gray-600">
        Report generated {{ now()->format('d M Y, H:i') }} · Ease Travel Accounting System
    </p>
</x-filament-panels::page>
