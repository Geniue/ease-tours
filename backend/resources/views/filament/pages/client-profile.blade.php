<x-filament-panels::page>
    @php
        $data   = $this->getViewData();
        $client = $data['client'];
        $stats  = $data['stats'];
        $txns   = $data['transactions'];

        $initials = collect(explode(' ', $client->name))->map(fn($w) => strtoupper(substr($w,0,1)))->take(2)->implode('');
    @endphp

    {{-- ══════════════════════════════════════════ CLIENT HEADER ══ --}}
    <div class="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 mb-6 text-white shadow-lg">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {{-- Avatar --}}
            <div class="flex-shrink-0 h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                {{ $initials }}
            </div>

            {{-- Info --}}
            <div class="flex-1 min-w-0">
                <h1 class="text-2xl font-bold truncate">{{ $client->name }}</h1>
                <div class="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/80">
                    @if($client->phone)
                        <span class="flex items-center gap-1">
                            <x-heroicon-o-phone class="h-4 w-4"/> {{ $client->phone }}
                        </span>
                    @endif
                    @if($client->email)
                        <span class="flex items-center gap-1">
                            <x-heroicon-o-envelope class="h-4 w-4"/> {{ $client->email }}
                        </span>
                    @endif
                    @if($client->passport_number)
                        <span class="flex items-center gap-1">
                            <x-heroicon-o-identification class="h-4 w-4"/> {{ $client->passport_number }}
                        </span>
                    @endif
                    @if($client->nationality)
                        <span class="flex items-center gap-1">
                            <x-heroicon-o-globe-alt class="h-4 w-4"/> {{ $client->nationality }}
                        </span>
                    @endif
                </div>
                @if($client->notes)
                    <p class="mt-2 text-sm text-white/70 italic">{{ $client->notes }}</p>
                @endif
            </div>

            {{-- Member since --}}
            <div class="text-right text-sm text-white/60 flex-shrink-0">
                <p>Client since</p>
                <p class="font-medium text-white/90">{{ $client->created_at->format('M Y') }}</p>
            </div>
        </div>
    </div>

    {{-- ════════════════════════════════════════════ STATS GRID ══ --}}
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        @php
            $statCards = [
                ['label'=>'Total Services',  'value'=> $stats['total'],                                    'icon'=>'heroicon-o-clipboard-document-list', 'color'=>'blue'],
                ['label'=>'Deals Done',       'value'=> $stats['done'],                                     'icon'=>'heroicon-o-check-circle',            'color'=>'green'],
                ['label'=>'Waiting',          'value'=> $stats['waiting'],                                  'icon'=>'heroicon-o-clock',                   'color'=>'yellow'],
                ['label'=>'Lost',             'value'=> $stats['lost'],                                     'icon'=>'heroicon-o-x-circle',                'color'=>'red'],
            ];
        @endphp

        @foreach($statCards as $card)
            @php
                $colorMap = [
                    'blue'   => ['bg'=>'bg-blue-50 dark:bg-blue-900/20',   'text'=>'text-blue-600 dark:text-blue-400',   'icon'=>'text-blue-400'],
                    'green'  => ['bg'=>'bg-green-50 dark:bg-green-900/20', 'text'=>'text-green-600 dark:text-green-400', 'icon'=>'text-green-400'],
                    'yellow' => ['bg'=>'bg-yellow-50 dark:bg-yellow-900/20','text'=>'text-yellow-600 dark:text-yellow-400','icon'=>'text-yellow-400'],
                    'red'    => ['bg'=>'bg-red-50 dark:bg-red-900/20',     'text'=>'text-red-600 dark:text-red-400',     'icon'=>'text-red-400'],
                ];
                $c = $colorMap[$card['color']];
            @endphp
            <div class="rounded-xl {{ $c['bg'] }} p-4 flex items-center gap-3">
                <x-dynamic-component :component="$card['icon']" class="h-8 w-8 {{ $c['icon'] }} flex-shrink-0"/>
                <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ $card['label'] }}</p>
                    <p class="text-2xl font-bold {{ $c['text'] }}">{{ $card['value'] }}</p>
                </div>
            </div>
        @endforeach
    </div>

    {{-- ══════════════════════════════════════ FINANCIAL SUMMARY ══ --}}
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        @php
            $finCards = [
                ['label'=>'Total Revenue',    'value'=>'EGP '.number_format($stats['total_revenue'],0),   'sub'=>'From done deals',        'border'=>'border-indigo-200 dark:border-indigo-700',  'bg'=>'bg-indigo-50 dark:bg-indigo-900/20',  'text'=>'text-indigo-700 dark:text-indigo-300'],
                ['label'=>'Total Profit',     'value'=>'EGP '.number_format($stats['total_profit'],0),    'sub'=>'Net earnings',           'border'=>'border-emerald-200 dark:border-emerald-700','bg'=>'bg-emerald-50 dark:bg-emerald-900/20','text'=>'text-emerald-700 dark:text-emerald-300'],
                ['label'=>'Collected',        'value'=>'EGP '.number_format($stats['total_collected'],0), 'sub'=>'Cash received',          'border'=>'border-green-200 dark:border-green-700',   'bg'=>'bg-green-50 dark:bg-green-900/20',    'text'=>'text-green-700 dark:text-green-300'],
                ['label'=>'Outstanding',      'value'=>'EGP '.number_format($stats['outstanding'],0),     'sub'=>'Balance due',            'border'=>'border-orange-200 dark:border-orange-700', 'bg'=>'bg-orange-50 dark:bg-orange-900/20',  'text'=>'text-orange-700 dark:text-orange-300'],
            ];
        @endphp

        @foreach($finCards as $card)
            <div class="rounded-xl border {{ $card['border'] }} {{ $card['bg'] }} p-5">
                <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ $card['label'] }}</p>
                <p class="mt-1 text-xl font-bold {{ $card['text'] }}">{{ $card['value'] }}</p>
                <p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{{ $card['sub'] }}</p>
            </div>
        @endforeach
    </div>

    {{-- ════════════════════════════════════ TRANSACTION HISTORY ══ --}}
    <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 class="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <x-heroicon-o-clipboard-document-list class="h-5 w-5 text-gray-400"/>
                Service History
            </h2>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ $txns->count() }} record(s)</span>
        </div>

        @if($txns->isEmpty())
            <div class="flex flex-col items-center justify-center py-16 text-center">
                <x-heroicon-o-document-text class="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3"/>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">No services yet</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Click "Add Service" to create the first transaction.</p>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            <th class="px-4 py-3">Date</th>
                            <th class="px-4 py-3">Service</th>
                            <th class="px-4 py-3 text-center">Status</th>
                            <th class="px-4 py-3 text-center">Follow Up</th>
                            <th class="px-4 py-3 text-right">Sell Price</th>
                            <th class="px-4 py-3 text-right">Net Cost</th>
                            <th class="px-4 py-3 text-right">Profit</th>
                            <th class="px-4 py-3 text-right">Collected</th>
                            <th class="px-4 py-3 text-right">Balance</th>
                            <th class="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 dark:divide-gray-700/50">
                        @foreach($txns as $txn)
                            @php
                                $balance = max(0, (float)$txn->sell_price - (float)$txn->current_money);
                                $statusConfig = [
                                    'done'    => ['bg'=>'bg-green-100 dark:bg-green-900/40',  'text'=>'text-green-700 dark:text-green-300',  'label'=>'Done'],
                                    'waiting' => ['bg'=>'bg-yellow-100 dark:bg-yellow-900/40','text'=>'text-yellow-700 dark:text-yellow-300','label'=>'Waiting'],
                                    'lost'    => ['bg'=>'bg-red-100 dark:bg-red-900/40',      'text'=>'text-red-700 dark:text-red-300',      'label'=>'Lost'],
                                ];
                                $sc = $statusConfig[$txn->status] ?? $statusConfig['waiting'];
                            @endphp
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                                <td class="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                    {{ $txn->transaction_date?->format('d/m/Y') ?? '—' }}
                                </td>
                                <td class="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[180px]">
                                    <span class="block truncate" title="{{ $txn->service }}">
                                        {{ $txn->service ?: '—' }}
                                    </span>
                                    @if($txn->notes)
                                        <span class="text-xs text-gray-400 dark:text-gray-500 block truncate italic">{{ $txn->notes }}</span>
                                    @endif
                                </td>
                                <td class="px-4 py-3 text-center">
                                    <span class="inline-flex items-center rounded-full {{ $sc['bg'] }} px-2.5 py-0.5 text-xs font-medium {{ $sc['text'] }}">
                                        {{ $sc['label'] }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-center text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">
                                    {{ $txn->follow_up_date?->format('d/m/Y') ?? '—' }}
                                </td>
                                <td class="px-4 py-3 text-right text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                                    {{ $txn->sell_price > 0 ? 'EGP '.number_format($txn->sell_price, 0) : '—' }}
                                </td>
                                <td class="px-4 py-3 text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                    {{ $txn->net_price > 0 ? 'EGP '.number_format($txn->net_price, 0) : '—' }}
                                </td>
                                <td class="px-4 py-3 text-right font-semibold whitespace-nowrap {{ (float)$txn->profit > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-400' }}">
                                    {{ (float)$txn->profit > 0 ? 'EGP '.number_format($txn->profit, 0) : '—' }}
                                </td>
                                <td class="px-4 py-3 text-right whitespace-nowrap {{ $txn->current_money > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400' }}">
                                    {{ $txn->current_money > 0 ? 'EGP '.number_format($txn->current_money, 0) : '—' }}
                                </td>
                                <td class="px-4 py-3 text-right whitespace-nowrap font-semibold {{ $balance > 0 && $txn->status === 'done' ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400' }}">
                                    {{ ($balance > 0 && $txn->status === 'done') ? 'EGP '.number_format($balance, 0) : '—' }}
                                </td>
                                <td class="px-4 py-3 text-right">
                                    <a href="{{ route('filament.admin.resources.client-transactions.edit', $txn) }}"
                                       class="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr class="bg-gray-50 dark:bg-gray-700/50 font-semibold text-gray-900 dark:text-white text-sm">
                            <td class="px-4 py-3" colspan="4">Totals</td>
                            <td class="px-4 py-3 text-right">EGP {{ number_format($txns->sum('sell_price'), 0) }}</td>
                            <td class="px-4 py-3 text-right text-gray-500">EGP {{ number_format($txns->sum('net_price'), 0) }}</td>
                            <td class="px-4 py-3 text-right text-green-600 dark:text-green-400">EGP {{ number_format($txns->sum('profit'), 0) }}</td>
                            <td class="px-4 py-3 text-right text-blue-600 dark:text-blue-400">EGP {{ number_format($txns->sum('current_money'), 0) }}</td>
                            <td class="px-4 py-3 text-right text-orange-600 dark:text-orange-400">EGP {{ number_format($stats['outstanding'], 0) }}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        @endif
    </div>

    {{-- footer --}}
    <p class="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
        Profile last updated {{ $client->updated_at->diffForHumans() }} · Ease Travel
    </p>
</x-filament-panels::page>
