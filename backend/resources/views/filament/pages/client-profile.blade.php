<x-filament-panels::page>
    @php
        $data   = $this->getViewData();
        $client = $data['client'];
        $stats  = $data['stats'];
        $txns   = $data['transactions'];

        $words    = array_filter(explode(' ', $client->name));
        $initials = strtoupper(substr($words[0] ?? 'C', 0, 1) . substr($words[1] ?? '', 0, 1));

        $doneRate = $stats['total'] > 0 ? round(($stats['done'] / $stats['total']) * 100) : 0;
        $collRate = $stats['total_revenue'] > 0 ? round(($stats['total_collected'] / $stats['total_revenue']) * 100) : 0;
    @endphp

    <style>
        .cp-card { border-radius:14px; padding:18px 22px; position:relative; overflow:hidden; }
        .cp-card-shine::before { content:''; position:absolute; top:-30px; right:-30px; width:100px; height:100px; border-radius:50%; background:rgba(255,255,255,.08); }
        .cp-stat-row { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:18px; }
        .cp-fin-row  { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:18px; }
        .cp-section  { border-radius:14px; overflow:hidden; margin-bottom:18px; }
        .cp-th { padding:10px 16px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; }
        .cp-td { padding:12px 16px; font-size:13px; }
        .cp-row-hover:hover { background:rgba(99,102,241,.04); }
        .cp-badge { display:inline-flex; align-items:center; border-radius:999px; padding:2px 10px; font-size:11px; font-weight:700; }
        @media(max-width:768px){
            .cp-stat-row, .cp-fin-row { grid-template-columns:repeat(2,1fr); }
        }
    </style>

    {{-- ══════════════════════════════════════ HERO HEADER ══ --}}
    <div style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4338ca 100%); border-radius:18px; padding:28px 32px; margin-bottom:18px; color:#fff; position:relative; overflow:hidden;">

        {{-- decorative circles --}}
        <div style="position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.05);"></div>
        <div style="position:absolute;bottom:-40px;right:120px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.04);"></div>

        <div style="display:flex;align-items:flex-start;gap:20px;position:relative;z-index:1;">

            {{-- Avatar --}}
            <div style="width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800;flex-shrink:0;">
                {{ $initials }}
            </div>

            {{-- Info --}}
            <div style="flex:1;min-width:0;">
                <h1 style="font-size:24px;font-weight:800;line-height:1.2;margin:0;">{{ $client->name }}</h1>

                <div style="display:flex;flex-wrap:wrap;gap:6px 20px;margin-top:8px;">
                    @if($client->phone)
                        <span style="font-size:13px;opacity:.75;display:flex;align-items:center;gap:5px;">
                            📞 {{ $client->phone }}
                        </span>
                    @endif
                    @if($client->email)
                        <span style="font-size:13px;opacity:.75;display:flex;align-items:center;gap:5px;">
                            ✉️ {{ $client->email }}
                        </span>
                    @endif
                    @if($client->passport_number)
                        <span style="font-size:13px;opacity:.75;display:flex;align-items:center;gap:5px;">
                            🪪 {{ $client->passport_number }}
                        </span>
                    @endif
                    @if($client->nationality)
                        <span style="font-size:13px;opacity:.75;display:flex;align-items:center;gap:5px;">
                            🌍 {{ $client->nationality }}
                        </span>
                    @endif
                </div>

                @if($client->notes)
                    <p style="font-size:12px;opacity:.55;margin-top:8px;font-style:italic;max-width:600px;">{{ $client->notes }}</p>
                @endif
            </div>

            {{-- Member since --}}
            <div style="text-align:right;flex-shrink:0;opacity:.6;font-size:12px;">
                <p>Client since</p>
                <p style="font-weight:700;font-size:14px;opacity:1;color:#c7d2fe;margin-top:2px;">{{ $client->created_at->format('M Y') }}</p>
            </div>
        </div>

        {{-- Mini progress bars --}}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:22px;position:relative;z-index:1;">
            <div>
                <div style="display:flex;justify-content:space-between;font-size:11px;opacity:.65;margin-bottom:5px;">
                    <span>Deal success rate</span><span>{{ $doneRate }}%</span>
                </div>
                <div style="height:5px;border-radius:999px;background:rgba(255,255,255,.15);">
                    <div style="height:5px;border-radius:999px;background:#a5b4fc;width:{{ $doneRate }}%;"></div>
                </div>
            </div>
            <div>
                <div style="display:flex;justify-content:space-between;font-size:11px;opacity:.65;margin-bottom:5px;">
                    <span>Collection rate</span><span>{{ $collRate }}%</span>
                </div>
                <div style="height:5px;border-radius:999px;background:rgba(255,255,255,.15);">
                    <div style="height:5px;border-radius:999px;background:#6ee7b7;width:{{ $collRate }}%;"></div>
                </div>
            </div>
        </div>
    </div>

    {{-- ══════════════════════════════════════ STATUS COUNTERS ══ --}}
    <div class="cp-stat-row">
        @php
            $counters = [
                ['icon'=>'📋','label'=>'Total Services','val'=>$stats['total'],  'bg'=>'#1e293b','border'=>'#334155','tc'=>'#94a3b8','vc'=>'#f1f5f9'],
                ['icon'=>'✅','label'=>'Done',          'val'=>$stats['done'],   'bg'=>'#052e16','border'=>'#14532d','tc'=>'#86efac','vc'=>'#4ade80'],
                ['icon'=>'⏳','label'=>'Waiting',       'val'=>$stats['waiting'],'bg'=>'#422006','border'=>'#713f12','tc'=>'#fde047','vc'=>'#fbbf24'],
                ['icon'=>'❌','label'=>'Lost',           'val'=>$stats['lost'],  'bg'=>'#2d0a0a','border'=>'#7f1d1d','tc'=>'#fca5a5','vc'=>'#f87171'],
            ];
        @endphp
        @foreach($counters as $c)
            <div style="background:{{ $c['bg'] }};border:1px solid {{ $c['border'] }};border-radius:12px;padding:16px 18px;display:flex;align-items:center;gap:12px;">
                <span style="font-size:24px;line-height:1;flex-shrink:0;">{{ $c['icon'] }}</span>
                <div>
                    <p style="font-size:11px;color:{{ $c['tc'] }};font-weight:600;text-transform:uppercase;letter-spacing:.04em;">{{ $c['label'] }}</p>
                    <p style="font-size:26px;font-weight:800;color:{{ $c['vc'] }};line-height:1.1;">{{ $c['val'] }}</p>
                </div>
            </div>
        @endforeach
    </div>

    {{-- ══════════════════════════════════════ FINANCIAL CARDS ══ --}}
    <div class="cp-fin-row">
        @php
            $fins = [
                ['icon'=>'💰','label'=>'Total Revenue',  'val'=>'EGP '.number_format($stats['total_revenue'],0), 'sub'=>'From done deals', 'grad'=>'linear-gradient(135deg,#6366f1,#4338ca)'],
                ['icon'=>'📈','label'=>'Total Profit',   'val'=>'EGP '.number_format($stats['total_profit'],0),  'sub'=>'Net earnings',    'grad'=>'linear-gradient(135deg,#10b981,#059669)'],
                ['icon'=>'🏦','label'=>'Collected',      'val'=>'EGP '.number_format($stats['total_collected'],0),'sub'=>'Cash received',  'grad'=>'linear-gradient(135deg,#0ea5e9,#0284c7)'],
                ['icon'=>'⚠️','label'=>'Outstanding',    'val'=>'EGP '.number_format($stats['outstanding'],0),   'sub'=>'Balance due',     'grad'=>'linear-gradient(135deg,#f59e0b,#d97706)'],
            ];
        @endphp
        @foreach($fins as $f)
            <div class="cp-card cp-card-shine" style="background:{{ $f['grad'] }};color:#fff;">
                <p style="font-size:18px;margin-bottom:4px;">{{ $f['icon'] }}</p>
                <p style="font-size:11px;font-weight:700;letter-spacing:.07em;opacity:.7;text-transform:uppercase;">{{ $f['label'] }}</p>
                <p style="font-size:20px;font-weight:800;line-height:1.2;margin-top:4px;">{{ $f['val'] }}</p>
                <p style="font-size:11px;opacity:.6;margin-top:3px;">{{ $f['sub'] }}</p>
            </div>
        @endforeach
    </div>

    {{-- ══════════════════════════════════════ SERVICE HISTORY ══ --}}
    <div class="cp-section" style="border:1px solid #1e293b;background:#0f172a;">
        <div style="background:#1e293b;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #334155;">
            <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:16px;">🗂️</span>
                <span style="font-weight:700;color:#f1f5f9;font-size:14px;">Service History</span>
            </div>
            <span style="font-size:12px;color:#64748b;">{{ $txns->count() }} record(s)</span>
        </div>

        @if($txns->isEmpty())
            <div style="padding:60px 20px;text-align:center;">
                <p style="font-size:40px;margin-bottom:12px;">📭</p>
                <p style="font-size:15px;font-weight:600;color:#475569;">No services yet</p>
                <p style="font-size:13px;color:#334155;margin-top:6px;">Click <strong style="color:#a5b4fc;">Add Service</strong> above to create the first transaction for this client.</p>
            </div>
        @else
            <div style="overflow-x:auto;">
                <table style="width:100%;border-collapse:collapse;">
                    <thead>
                        <tr style="background:#1a2332;">
                            <th class="cp-th" style="text-align:left;color:#64748b;">Date</th>
                            <th class="cp-th" style="text-align:left;color:#64748b;">Service</th>
                            <th class="cp-th" style="text-align:center;color:#64748b;">Status</th>
                            <th class="cp-th" style="text-align:center;color:#64748b;">Follow Up</th>
                            <th class="cp-th" style="text-align:right;color:#64748b;">Sell</th>
                            <th class="cp-th" style="text-align:right;color:#64748b;">Cost</th>
                            <th class="cp-th" style="text-align:right;color:#64748b;">Profit</th>
                            <th class="cp-th" style="text-align:right;color:#64748b;">Collected</th>
                            <th class="cp-th" style="text-align:right;color:#64748b;">Balance</th>
                            <th class="cp-th"></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($txns as $i => $txn)
                            @php
                                $balance = max(0, (float)$txn->sell_price - (float)$txn->current_money);
                                $statusMap = [
                                    'done'    => ['bg'=>'#052e16','color'=>'#4ade80','label'=>'Done'],
                                    'waiting' => ['bg'=>'#422006','color'=>'#fbbf24','label'=>'Waiting'],
                                    'lost'    => ['bg'=>'#2d0a0a','color'=>'#f87171','label'=>'Lost'],
                                ];
                                $sc = $statusMap[$txn->status] ?? $statusMap['waiting'];
                            @endphp
                            <tr class="cp-row-hover" style="border-top:1px solid #1e293b;{{ $i % 2 === 1 ? 'background:rgba(255,255,255,.015);' : '' }}">
                                <td class="cp-td" style="color:#94a3b8;white-space:nowrap;font-size:12px;">
                                    {{ $txn->transaction_date?->format('d/m/Y') ?? '—' }}
                                </td>
                                <td class="cp-td" style="max-width:180px;">
                                    <span style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;color:#e2e8f0;" title="{{ $txn->service }}">
                                        {{ $txn->service ?: '—' }}
                                    </span>
                                    @if($txn->notes)
                                        <span style="display:block;font-size:11px;color:#475569;font-style:italic;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ $txn->notes }}</span>
                                    @endif
                                </td>
                                <td class="cp-td" style="text-align:center;">
                                    <span class="cp-badge" style="background:{{ $sc['bg'] }};color:{{ $sc['color'] }};">{{ $sc['label'] }}</span>
                                </td>
                                <td class="cp-td" style="text-align:center;color:#64748b;font-size:12px;white-space:nowrap;">
                                    {{ $txn->follow_up_date?->format('d/m/Y') ?? '—' }}
                                </td>
                                <td class="cp-td" style="text-align:right;color:#cbd5e1;font-weight:500;white-space:nowrap;">
                                    {{ $txn->sell_price > 0 ? 'EGP '.number_format($txn->sell_price,0) : '—' }}
                                </td>
                                <td class="cp-td" style="text-align:right;color:#64748b;white-space:nowrap;">
                                    {{ $txn->net_price > 0 ? 'EGP '.number_format($txn->net_price,0) : '—' }}
                                </td>
                                <td class="cp-td" style="text-align:right;white-space:nowrap;font-weight:700;color:{{ (float)$txn->profit > 0 ? '#4ade80' : '#475569' }};">
                                    {{ (float)$txn->profit > 0 ? 'EGP '.number_format($txn->profit,0) : '—' }}
                                </td>
                                <td class="cp-td" style="text-align:right;white-space:nowrap;color:{{ $txn->current_money > 0 ? '#60a5fa' : '#334155' }};">
                                    {{ $txn->current_money > 0 ? 'EGP '.number_format($txn->current_money,0) : '—' }}
                                </td>
                                <td class="cp-td" style="text-align:right;white-space:nowrap;">
                                    @if($balance > 0 && $txn->status === 'done')
                                        <span style="background:#431407;color:#fb923c;font-weight:700;padding:3px 10px;border-radius:8px;font-size:12px;">
                                            EGP {{ number_format($balance,0) }}
                                        </span>
                                    @else
                                        <span style="color:#1e293b;">—</span>
                                    @endif
                                </td>
                                <td class="cp-td" style="text-align:right;">
                                    <a href="{{ route('filament.admin.resources.client-transactions.edit', $txn) }}"
                                       style="font-size:12px;font-weight:600;color:#818cf8;text-decoration:none;padding:4px 10px;border:1px solid #3730a3;border-radius:6px;white-space:nowrap;">
                                        ✏️ Edit
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr style="background:#1e293b;border-top:2px solid #334155;">
                            <td class="cp-td" colspan="4" style="font-weight:800;color:#f1f5f9;">Totals</td>
                            <td class="cp-td" style="text-align:right;font-weight:700;color:#e2e8f0;">EGP {{ number_format($txns->sum('sell_price'),0) }}</td>
                            <td class="cp-td" style="text-align:right;color:#64748b;font-weight:700;">EGP {{ number_format($txns->sum('net_price'),0) }}</td>
                            <td class="cp-td" style="text-align:right;font-weight:800;color:#4ade80;">EGP {{ number_format($txns->sum('profit'),0) }}</td>
                            <td class="cp-td" style="text-align:right;font-weight:700;color:#60a5fa;">EGP {{ number_format($txns->sum('current_money'),0) }}</td>
                            <td class="cp-td" style="text-align:right;font-weight:800;color:#fb923c;">EGP {{ number_format($stats['outstanding'],0) }}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        @endif
    </div>

    <p style="text-align:center;font-size:11px;color:#1e293b;padding-bottom:16px;">
        Last updated {{ $client->updated_at->diffForHumans() }} &middot; Ease Travel
    </p>

</x-filament-panels::page>
