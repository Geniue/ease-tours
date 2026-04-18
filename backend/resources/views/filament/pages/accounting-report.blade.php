<x-filament-panels::page>
    @php
        $data = $this->getViewData();
        $s    = $data['summary'];

        $profitMarginColor = $s['profit_margin'] >= 20 ? 'text-emerald-600 dark:text-emerald-400'
                           : ($s['profit_margin'] >= 10 ? 'text-yellow-600 dark:text-yellow-400'
                           : 'text-red-600 dark:text-red-400');
    @endphp

    {{-- ══════════════════════════════════════════ HERO STATS ══ --}}
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 mb-6">

        {{-- Revenue Card --}}
        <div class="col-span-1 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 text-white shadow-lg">
            <div class="flex items-start justify-between">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest text-indigo-200">Total Revenue</p>
                    <p class="mt-2 text-3xl font-extrabold">EGP {{ number_format($s['total_revenue'], 0) }}</p>
                    <p class="mt-1 text-sm text-indigo-200">From {{ number_format($s['done']) }} completed deals</p>
                </div>
                <div class="rounded-xl bg-white/15 p-3">
                    <x-heroicon-o-banknotes class="h-7 w-7 text-white"/>
                </div>
            </div>
            <div class="mt-4 h-1 w-full rounded-full bg-white/20">
                <div class="h-1 rounded-full bg-white" style="width: {{ min(100, $s['collection_rate']) }}%"></div>
            </div>
            <p class="mt-1 text-xs text-indigo-200">{{ $s['collection_rate'] }}% collected</p>
        </div>

        {{-- Profit Card --}}
        <div class="col-span-1 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white shadow-lg">
            <div class="flex items-start justify-between">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest text-emerald-200">Total Profit</p>
                    <p class="mt-2 text-3xl font-extrabold">EGP {{ number_format($s['total_profit'], 0) }}</p>
                    <p class="mt-1 text-sm text-emerald-200">{{ $s['profit_margin'] }}% profit margin</p>
                </div>
                <div class="rounded-xl bg-white/15 p-3">
                    <x-heroicon-o-arrow-trending-up class="h-7 w-7 text-white"/>
                </div>
            </div>
            <div class="mt-4 h-1 w-full rounded-full bg-white/20">
                <div class="h-1 rounded-full bg-white" style="width: {{ min(100, $s['profit_margin']) }}%"></div>
            </div>
            <p class="mt-1 text-xs text-emerald-200">{{ $s['profit_margin'] }}% margin on done deals</p>
        </div>

        {{-- Pipeline + Outstanding --}}
        <div class="col-span-1 grid grid-rows-2 gap-4">
            <div class="rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 p-4 text-white shadow-md flex items-center gap-4">
                <div class="rounded-xl bg-white/20 p-2.5">
                    <x-heroicon-o-clock class="h-6 w-6"/>
                </div>
                <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-amber-100">Pending Pipeline</p>
                    <p class="text-xl font-bold">EGP {{ number_format($s['pending_revenue'], 0) }}</p>
                    <p class="text-xs text-amber-100">{{ $s['waiting'] }} deals in progress</p>
                </div>
            </div>
            <div class="rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white shadow-md flex items-center gap-4">
                <div class="rounded-xl bg-white/20 p-2.5">
                    <x-heroicon-o-exclamation-circle class="h-6 w-6"/>
                </div>
                <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-orange-100">Outstanding Balance</p>
                    <p class="text-xl font-bold">EGP {{ number_format($data['totalOutstanding'], 0) }}</p>
                    <p class="text-xs text-orange-100">{{ $data['outstanding']->count() }} clients owe balance</p>
                </div>
            </div>
        </div>
    </div>

    {{-- ══════════════════════════════════════ STATUS COUNTER ROW ══ --}}
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        @php
            $counters = [
                ['label'=>'All Transactions', 'value'=>$s['total'],   'icon'=>'heroicon-o-clipboard-document-list', 'bg'=>'bg-gray-50 dark:bg-gray-800',       'text'=>'text-gray-700 dark:text-gray-200',  'ring'=>'ring-gray-200 dark:ring-gray-700'],
                ['label'=>'Done',             'value'=>$s['done'],    'icon'=>'heroicon-o-check-badge',             'bg'=>'bg-green-50 dark:bg-green-900/20',   'text'=>'text-green-700 dark:text-green-300','ring'=>'ring-green-200 dark:ring-green-800'],
                ['label'=>'Waiting',          'value'=>$s['waiting'], 'icon'=>'heroicon-o-hourglass',               'bg'=>'bg-yellow-50 dark:bg-yellow-900/20', 'text'=>'text-yellow-700 dark:text-yellow-300','ring'=>'ring-yellow-200 dark:ring-yellow-800'],
                ['label'=>'Lost',             'value'=>$s['lost'],    'icon'=>'heroicon-o-x-circle',                'bg'=>'bg-red-50 dark:bg-red-900/20',       'text'=>'text-red-700 dark:text-red-300',    'ring'=>'ring-red-200 dark:ring-red-800'],
            ];
        @endphp
        @foreach($counters as $c)
            <div class="rounded-xl ring-1 {{ $c['ring'] }} {{ $c['bg'] }} px-5 py-4 flex items-center gap-3">
                <x-dynamic-component :component="$c['icon']" class="h-8 w-8 {{ $c['text'] }} opacity-70 flex-shrink-0"/>
                <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ $c['label'] }}</p>
                    <p class="text-2xl font-extrabold {{ $c['text'] }}">{{ number_format($c['value']) }}</p>
                </div>
            </div>
        @endforeach
    </div>

    {{-- ══════════════════════════════════════ BY SERVICE TABLE ══ --}}
    <div class="rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden mb-6">
        <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <x-heroicon-o-squares-2x2 class="h-5 w-5 text-gray-400"/>
            <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Revenue by Service</h2>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gray-50 dark:bg-gray-700/40 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        <th class="px-5 py-3 text-left">Service</th>
                        <th class="px-4 py-3 text-center">Total</th>
                        <th class="px-4 py-3 text-center">Done</th>
                        <th class="px-4 py-3 text-center">Wait</th>
                        <th class="px-4 py-3 text-center">Lost</th>
                        <th class="px-4 py-3 text-right">Revenue</th>
                        <th class="px-4 py-3 text-right">Cost</th>
                        <th class="px-4 py-3 text-right">Profit</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700/50">
                    @foreach ($data['byService'] as $row)
                        @php $pct = $row->total_sell > 0 ? round(($row->total_profit / $row->total_sell) * 100) : 0; @endphp
                        <tr class="group hover:bg-primary-50/40 dark:hover:bg-primary-900/10 transition-colors">
                            <td class="px-5 py-3.5 font-medium text-gray-900 dark:text-white max-w-[220px]">
                                <span class="block truncate" title="{{ $row->service }}">{{ $row->service ?: '—' }}</span>
                            </td>
                            <td class="px-4 py-3.5 text-center text-gray-600 dark:text-gray-400">{{ $row->count }}</td>
                            <td class="px-4 py-3.5 text-center">
                                <span class="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/40 px-2 py-0.5 text-xs font-semibold text-green-700 dark:text-green-300">{{ $row->done_count }}</span>
                            </td>
                            <td class="px-4 py-3.5 text-center">
                                <span class="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/40 px-2 py-0.5 text-xs font-semibold text-yellow-700 dark:text-yellow-300">{{ $row->waiting_count }}</span>
                            </td>
                            <td class="px-4 py-3.5 text-center">
                                <span class="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/40 px-2 py-0.5 text-xs font-semibold text-red-700 dark:text-red-300">{{ $row->lost_count }}</span>
                            </td>
                            <td class="px-4 py-3.5 text-right font-medium text-gray-700 dark:text-gray-300">EGP {{ number_format($row->total_sell, 0) }}</td>
                            <td class="px-4 py-3.5 text-right text-gray-500 dark:text-gray-400">EGP {{ number_format($row->total_net, 0) }}</td>
                            <td class="px-4 py-3.5 text-right">
                                <span class="font-bold {{ $row->total_profit > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500' }}">
                                    EGP {{ number_format($row->total_profit, 0) }}
                                </span>
                                <span class="ml-1 text-xs {{ $pct >= 20 ? 'text-emerald-500' : 'text-gray-400' }}">{{ $pct }}%</span>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr class="bg-gray-50 dark:bg-gray-700/40 font-bold text-gray-900 dark:text-white text-sm border-t-2 border-gray-200 dark:border-gray-600">
                        <td class="px-5 py-3">TOTAL</td>
                        <td class="px-4 py-3 text-center">{{ $data['byService']->sum('count') }}</td>
                        <td class="px-4 py-3 text-center text-emerald-600">{{ $data['byService']->sum('done_count') }}</td>
                        <td class="px-4 py-3 text-center text-yellow-600">{{ $data['byService']->sum('waiting_count') }}</td>
                        <td class="px-4 py-3 text-center text-red-600">{{ $data['byService']->sum('lost_count') }}</td>
                        <td class="px-4 py-3 text-right">EGP {{ number_format($data['byService']->sum('total_sell'), 0) }}</td>
                        <td class="px-4 py-3 text-right text-gray-500">EGP {{ number_format($data['byService']->sum('total_net'), 0) }}</td>
                        <td class="px-4 py-3 text-right text-emerald-600">EGP {{ number_format($data['byService']->sum('total_profit'), 0) }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

    {{-- ═══════════════════════════════════════ MONTHLY PERF ══ --}}
    @if ($data['byMonth']->isNotEmpty())
    <div class="rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden mb-6">
        <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <x-heroicon-o-calendar-days class="h-5 w-5 text-gray-400"/>
            <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Monthly Performance</h2>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gray-50 dark:bg-gray-700/40 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        <th class="px-5 py-3 text-left">Month</th>
                        <th class="px-4 py-3 text-center">Total</th>
                        <th class="px-4 py-3 text-center">Done</th>
                        <th class="px-4 py-3 text-center">Waiting</th>
                        <th class="px-4 py-3 text-right">Revenue</th>
                        <th class="px-4 py-3 text-right">Profit</th>
                        <th class="px-4 py-3 text-right">Collected</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700/50">
                    @foreach ($data['byMonth'] as $row)
                        <tr class="hover:bg-primary-50/40 dark:hover:bg-primary-900/10 transition-colors">
                            <td class="px-5 py-3.5 font-semibold text-gray-900 dark:text-white">{{ $row->month_label }}</td>
                            <td class="px-4 py-3.5 text-center text-gray-600 dark:text-gray-400">{{ $row->count }}</td>
                            <td class="px-4 py-3.5 text-center font-medium text-emerald-600 dark:text-emerald-400">{{ $row->done_count }}</td>
                            <td class="px-4 py-3.5 text-center font-medium text-yellow-600 dark:text-yellow-400">{{ $row->waiting_count }}</td>
                            <td class="px-4 py-3.5 text-right font-medium text-gray-700 dark:text-gray-300">EGP {{ number_format($row->total_sell, 0) }}</td>
                            <td class="px-4 py-3.5 text-right font-bold text-emerald-600 dark:text-emerald-400">EGP {{ number_format($row->total_profit, 0) }}</td>
                            <td class="px-4 py-3.5 text-right text-blue-600 dark:text-blue-400">EGP {{ number_format($row->total_collected, 0) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    @endif

    {{-- ════════════════════════════════════ OUTSTANDING TABLE ══ --}}
    @if ($data['outstanding']->isNotEmpty())
    <div class="rounded-2xl ring-1 ring-orange-200 dark:ring-orange-800 bg-white dark:bg-gray-800 shadow-sm overflow-hidden mb-6">
        <div class="flex items-center justify-between gap-3 px-6 py-4 border-b border-orange-100 dark:border-orange-900/50">
            <div class="flex items-center gap-3">
                <x-heroicon-o-exclamation-triangle class="h-5 w-5 text-orange-500"/>
                <div>
                    <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Outstanding Balances</h2>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Services delivered but not fully paid</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-xs text-orange-500 uppercase font-semibold tracking-wide">Total Due</p>
                <p class="text-lg font-extrabold text-orange-600 dark:text-orange-400">EGP {{ number_format($data['totalOutstanding'], 0) }}</p>
            </div>
        </div>

        {{-- Explanation banner --}}
        <div class="bg-orange-50 dark:bg-orange-900/10 border-b border-orange-100 dark:border-orange-900/30 px-6 py-3">
            <p class="text-xs text-orange-700 dark:text-orange-300">
                <strong>What is this?</strong>
                These are completed deals where the client received the service but has not paid the full amount yet.
                The "Balance Due" column shows how much each client still owes you.
            </p>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-orange-50/60 dark:bg-orange-900/10 text-xs font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-400">
                        <th class="px-5 py-3 text-left">Client</th>
                        <th class="px-4 py-3 text-left">Service</th>
                        <th class="px-4 py-3 text-center">Date</th>
                        <th class="px-4 py-3 text-right">Sell Price</th>
                        <th class="px-4 py-3 text-right">Collected</th>
                        <th class="px-4 py-3 text-right">Balance Due</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-orange-50 dark:divide-orange-900/20">
                    @foreach ($data['outstanding'] as $row)
                        @php $paidPct = $row->sell_price > 0 ? round(($row->current_money / $row->sell_price) * 100) : 0; @endphp
                        <tr class="hover:bg-orange-50/70 dark:hover:bg-orange-900/10 transition-colors">
                            <td class="px-5 py-3.5 font-semibold text-gray-900 dark:text-white">{{ $row->client_name }}</td>
                            <td class="px-4 py-3.5 text-gray-600 dark:text-gray-400 max-w-[180px]">
                                <span class="block truncate" title="{{ $row->service }}">{{ $row->service ?: '—' }}</span>
                            </td>
                            <td class="px-4 py-3.5 text-center text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">
                                {{ $row->transaction_date?->format('d/m/Y') }}
                            </td>
                            <td class="px-4 py-3.5 text-right font-medium text-gray-700 dark:text-gray-300">EGP {{ number_format($row->sell_price, 0) }}</td>
                            <td class="px-4 py-3.5 text-right">
                                <span class="text-emerald-600 dark:text-emerald-400 font-medium">EGP {{ number_format($row->current_money, 0) }}</span>
                                <span class="ml-1 text-xs text-gray-400">({{ $paidPct }}%)</span>
                            </td>
                            <td class="px-4 py-3.5 text-right">
                                <span class="inline-flex items-center rounded-lg bg-orange-100 dark:bg-orange-900/40 px-3 py-1 text-sm font-bold text-orange-700 dark:text-orange-300">
                                    EGP {{ number_format($row->balance, 0) }}
                                </span>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    @endif

    {{-- ════════════════════════════════════════ TOP CLIENTS ══ --}}
    <div class="rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden mb-6">
        <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <x-heroicon-o-trophy class="h-5 w-5 text-yellow-500"/>
            <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Top 10 Clients by Profit</h2>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gray-50 dark:bg-gray-700/40 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        <th class="px-5 py-3 text-center w-12">#</th>
                        <th class="px-4 py-3 text-left">Client</th>
                        <th class="px-4 py-3 text-center">Services</th>
                        <th class="px-4 py-3 text-right">Revenue</th>
                        <th class="px-4 py-3 text-right">Profit</th>
                        <th class="px-4 py-3 text-right">Collected</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700/50">
                    @foreach ($data['topClients'] as $i => $row)
                        @php
                            $medal = match($i) { 0=>'🥇', 1=>'🥈', 2=>'🥉', default=>null };
                            $isTop3 = $i < 3;
                        @endphp
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors {{ $isTop3 ? 'bg-yellow-50/40 dark:bg-yellow-900/5' : '' }}">
                            <td class="px-5 py-3.5 text-center">
                                @if($medal)
                                    <span class="text-lg">{{ $medal }}</span>
                                @else
                                    <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-500">{{ $i+1 }}</span>
                                @endif
                            </td>
                            <td class="px-4 py-3.5 font-semibold text-gray-900 dark:text-white">{{ $row->client_name }}</td>
                            <td class="px-4 py-3.5 text-center">
                                <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
                                    {{ $row->count }}
                                </span>
                            </td>
                            <td class="px-4 py-3.5 text-right font-medium text-gray-700 dark:text-gray-300">EGP {{ number_format($row->total_sell, 0) }}</td>
                            <td class="px-4 py-3.5 text-right font-bold text-emerald-600 dark:text-emerald-400">EGP {{ number_format($row->total_profit, 0) }}</td>
                            <td class="px-4 py-3.5 text-right text-blue-600 dark:text-blue-400">EGP {{ number_format($row->total_collected ?? 0, 0) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    {{-- Footer --}}
    <p class="text-center text-xs text-gray-400 dark:text-gray-600 pb-4">
        Report generated {{ now()->format('d M Y, H:i') }} &middot; Ease Travel Accounting System
    </p>

</x-filament-panels::page>
