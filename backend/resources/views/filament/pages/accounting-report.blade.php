<x-filament-panels::page>
    @php
        $data = $this->getViewData();
        $s    = $data['summary'];
        $collectionRate = $s['collection_rate'];
        $profitMargin   = $s['profit_margin'];
    @endphp

    <style>
        .ar-card {
            border-radius: 16px;
            padding: 20px 24px;
            position: relative;
            overflow: hidden;
        }
        .ar-card-shine::before {
            content: '';
            position: absolute;
            top: -40px; right: -40px;
            width: 120px; height: 120px;
            border-radius: 50%;
            background: rgba(255,255,255,0.08);
        }
        .ar-card-shine::after {
            content: '';
            position: absolute;
            bottom: -30px; left: -30px;
            width: 80px; height: 80px;
            border-radius: 50%;
            background: rgba(255,255,255,0.05);
        }
        .ar-badge {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            padding: 2px 10px;
            font-size: 11px;
            font-weight: 600;
        }
        .ar-table th {
            padding: 10px 16px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.07em;
        }
        .ar-table td {
            padding: 12px 16px;
            font-size: 13px;
        }
        .ar-progress {
            height: 6px;
            border-radius: 999px;
            background: rgba(255,255,255,0.15);
            overflow: hidden;
            margin-top: 10px;
        }
        .ar-progress-fill {
            height: 100%;
            border-radius: 999px;
            background: rgba(255,255,255,0.75);
            transition: width 0.6s ease;
        }
        .ar-section {
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 20px;
        }
        .ar-section-header {
            padding: 14px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom-width: 1px;
        }
        .ar-row-hover:hover {
            background: rgba(99, 102, 241, 0.04);
        }
    </style>

    {{-- ══════════════════════════ TOP 4 KPI CARDS ══ --}}
    <div style="display:grid; grid-template-columns: repeat(4,1fr); gap:14px; margin-bottom:20px;">

        {{-- Revenue --}}
        <div class="ar-card ar-card-shine" style="background: linear-gradient(135deg, #6366f1, #4338ca); color:#fff;">
            <p style="font-size:11px;font-weight:700;letter-spacing:.08em;opacity:.75;text-transform:uppercase;">Total Revenue</p>
            <p style="font-size:26px;font-weight:800;margin-top:4px;line-height:1.1;">EGP {{ number_format($s['total_revenue'], 0) }}</p>
            <p style="font-size:12px;opacity:.7;margin-top:3px;">{{ $s['done'] }} completed deals</p>
            <div class="ar-progress"><div class="ar-progress-fill" style="width:{{ min(100,$collectionRate) }}%;"></div></div>
            <p style="font-size:11px;opacity:.6;margin-top:4px;">{{ $collectionRate }}% collected</p>
        </div>

        {{-- Profit --}}
        <div class="ar-card ar-card-shine" style="background: linear-gradient(135deg, #10b981, #059669); color:#fff;">
            <p style="font-size:11px;font-weight:700;letter-spacing:.08em;opacity:.75;text-transform:uppercase;">Total Profit</p>
            <p style="font-size:26px;font-weight:800;margin-top:4px;line-height:1.1;">EGP {{ number_format($s['total_profit'], 0) }}</p>
            <p style="font-size:12px;opacity:.7;margin-top:3px;">{{ $profitMargin }}% profit margin</p>
            <div class="ar-progress"><div class="ar-progress-fill" style="width:{{ min(100,$profitMargin) }}%;"></div></div>
            <p style="font-size:11px;opacity:.6;margin-top:4px;">On done deals only</p>
        </div>

        {{-- Collected --}}
        <div class="ar-card ar-card-shine" style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color:#fff;">
            <p style="font-size:11px;font-weight:700;letter-spacing:.08em;opacity:.75;text-transform:uppercase;">Cash Collected</p>
            <p style="font-size:26px;font-weight:800;margin-top:4px;line-height:1.1;">EGP {{ number_format($s['total_collected'], 0) }}</p>
            <p style="font-size:12px;opacity:.7;margin-top:3px;">Of EGP {{ number_format($s['total_revenue'], 0) }} total</p>
            <div class="ar-progress"><div class="ar-progress-fill" style="width:{{ min(100,$collectionRate) }}%;"></div></div>
            <p style="font-size:11px;opacity:.6;margin-top:4px;">{{ $collectionRate }}% collection rate</p>
        </div>

        {{-- Outstanding --}}
        <div class="ar-card ar-card-shine" style="background: linear-gradient(135deg, #f59e0b, #d97706); color:#fff;">
            <p style="font-size:11px;font-weight:700;letter-spacing:.08em;opacity:.75;text-transform:uppercase;">Outstanding</p>
            <p style="font-size:26px;font-weight:800;margin-top:4px;line-height:1.1;">EGP {{ number_format($data['totalOutstanding'], 0) }}</p>
            <p style="font-size:12px;opacity:.7;margin-top:3px;">{{ $data['outstanding']->count() }} clients owe balance</p>
            <div class="ar-progress"><div class="ar-progress-fill" style="width:{{ $s['total_revenue'] > 0 ? min(100, round(($data['totalOutstanding']/$s['total_revenue'])*100)) : 0 }}%;"></div></div>
            <p style="font-size:11px;opacity:.6;margin-top:4px;">From delivered services</p>
        </div>
    </div>

    {{-- ══════════════════════════ STATUS MINI STATS ══ --}}
    <div style="display:grid; grid-template-columns: repeat(4,1fr); gap:12px; margin-bottom:20px;">

        @php
            $miniStats = [
                ['label'=>'All Transactions', 'val'=>$s['total'],   'icon'=>'📋', 'bg'=>'#1e293b', 'border'=>'#334155', 'text'=>'#94a3b8', 'num'=>'#f1f5f9'],
                ['label'=>'Done',             'val'=>$s['done'],    'icon'=>'✅', 'bg'=>'#052e16', 'border'=>'#14532d', 'text'=>'#86efac', 'num'=>'#4ade80'],
                ['label'=>'Waiting',          'val'=>$s['waiting'], 'icon'=>'⏳', 'bg'=>'#422006', 'border'=>'#713f12', 'text'=>'#fde047', 'num'=>'#fbbf24'],
                ['label'=>'Lost',             'val'=>$s['lost'],    'icon'=>'❌', 'bg'=>'#2d0a0a', 'border'=>'#7f1d1d', 'text'=>'#fca5a5', 'num'=>'#f87171'],
            ];
        @endphp

        @foreach($miniStats as $ms)
            <div style="background:{{ $ms['bg'] }}; border:1px solid {{ $ms['border'] }}; border-radius:12px; padding:16px 20px; display:flex; align-items:center; gap:14px;">
                <span style="font-size:26px; line-height:1;">{{ $ms['icon'] }}</span>
                <div>
                    <p style="font-size:11px; color:{{ $ms['text'] }}; font-weight:600; letter-spacing:.04em; text-transform:uppercase;">{{ $ms['label'] }}</p>
                    <p style="font-size:28px; font-weight:800; color:{{ $ms['num'] }}; line-height:1.1;">{{ number_format($ms['val']) }}</p>
                </div>
            </div>
        @endforeach
    </div>

    {{-- ══════════════════════════ PIPELINE + PENDING ══ --}}
    @if($s['waiting'] > 0 || $s['pending_revenue'] > 0)
    @php
        $pendingMargin = $s['pending_revenue'] > 0
            ? round(($s['pending_profit'] / $s['pending_revenue']) * 100, 1)
            : 0;
    @endphp
    <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:14px;padding:20px 24px;margin-bottom:20px;color:#fff;display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;align-items:center;">
        {{-- Pipeline Revenue --}}
        <div style="display:flex;align-items:center;gap:14px;">
            <div style="background:rgba(255,255,255,.12);border-radius:10px;padding:10px;flex-shrink:0;">
                <svg style="width:22px;height:22px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
                <p style="font-size:11px;opacity:.55;text-transform:uppercase;letter-spacing:.07em;font-weight:700;">Pending Revenue</p>
                <p style="font-size:22px;font-weight:800;line-height:1.1;">EGP {{ number_format($s['pending_revenue'], 0) }}</p>
                <p style="font-size:11px;opacity:.45;margin-top:2px;">{{ $s['waiting'] }} deals in progress</p>
            </div>
        </div>

        {{-- Expected Profit --}}
        <div style="border-left:1px solid rgba(255,255,255,.1);border-right:1px solid rgba(255,255,255,.1);padding:0 24px;text-align:center;">
            <p style="font-size:11px;opacity:.55;text-transform:uppercase;letter-spacing:.07em;font-weight:700;">Expected Profit</p>
            <p style="font-size:22px;font-weight:800;line-height:1.1;color:#6ee7b7;">EGP {{ number_format($s['pending_profit'], 0) }}</p>
            <p style="font-size:11px;opacity:.45;margin-top:2px;">If all {{ $s['waiting'] }} deals close</p>
        </div>

        {{-- Margin --}}
        <div style="text-align:right;">
            <p style="font-size:11px;opacity:.55;text-transform:uppercase;letter-spacing:.07em;font-weight:700;">Expected Margin</p>
            <p style="font-size:28px;font-weight:800;line-height:1;color:#a5b4fc;">{{ $pendingMargin }}%</p>
            <p style="font-size:11px;opacity:.45;margin-top:2px;">Profit / Revenue</p>
        </div>
    </div>
    @endif

    {{-- ══════════════════════════ BY SERVICE ══ --}}
    <div class="ar-section" style="border:1px solid #1e293b; background:#0f172a; margin-bottom:20px;">
        <div class="ar-section-header" style="background:#1e293b; border-color:#334155;">
            <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:16px;">📊</span>
                <span style="font-weight:700; color:#f1f5f9; font-size:14px;">Revenue by Service</span>
            </div>
            <span style="font-size:12px;color:#64748b;">{{ $data['byService']->count() }} services</span>
        </div>
        <div style="overflow-x:auto;">
            <table class="ar-table" style="width:100%;border-collapse:collapse;">
                <thead>
                    <tr style="background:#1a2332; color:#64748b;">
                        <th style="text-align:left;">Service</th>
                        <th style="text-align:center;">Total</th>
                        <th style="text-align:center;">Done</th>
                        <th style="text-align:center;">Waiting</th>
                        <th style="text-align:center;">Lost</th>
                        <th style="text-align:right;">Revenue</th>
                        <th style="text-align:right;">Cost</th>
                        <th style="text-align:right;">Profit</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($data['byService'] as $i => $row)
                        @php $pct = $row->total_sell > 0 ? round(($row->total_profit / $row->total_sell) * 100) : 0; @endphp
                        <tr class="ar-row-hover" style="border-top:1px solid #1e293b; {{ $i % 2 === 1 ? 'background:rgba(255,255,255,0.015);' : '' }}">
                            <td style="font-weight:600; color:#e2e8f0; max-width:200px;">
                                <span style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="{{ $row->service }}">
                                    {{ $row->service ?: '—' }}
                                </span>
                            </td>
                            <td style="text-align:center;color:#94a3b8;">{{ $row->count }}</td>
                            <td style="text-align:center;"><span class="ar-badge" style="background:#052e16;color:#4ade80;">{{ $row->done_count }}</span></td>
                            <td style="text-align:center;"><span class="ar-badge" style="background:#422006;color:#fbbf24;">{{ $row->waiting_count }}</span></td>
                            <td style="text-align:center;"><span class="ar-badge" style="background:#2d0a0a;color:#f87171;">{{ $row->lost_count }}</span></td>
                            <td style="text-align:right;color:#cbd5e1;font-weight:500;">EGP {{ number_format($row->total_sell, 0) }}</td>
                            <td style="text-align:right;color:#64748b;">EGP {{ number_format($row->total_net, 0) }}</td>
                            <td style="text-align:right;">
                                <span style="font-weight:700; color:{{ $row->total_profit > 0 ? '#4ade80' : '#f87171' }};">
                                    EGP {{ number_format($row->total_profit, 0) }}
                                </span>
                                <span style="color:{{ $pct>=20?'#34d399':'#94a3b8' }};font-size:11px;margin-left:4px;">{{ $pct }}%</span>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr style="background:#1e293b;border-top:2px solid #334155;">
                        <td style="padding:12px 16px;font-weight:800;color:#f1f5f9;font-size:13px;">TOTAL</td>
                        <td style="text-align:center;padding:12px 16px;color:#94a3b8;font-weight:700;">{{ $data['byService']->sum('count') }}</td>
                        <td style="text-align:center;padding:12px 16px;color:#4ade80;font-weight:700;">{{ $data['byService']->sum('done_count') }}</td>
                        <td style="text-align:center;padding:12px 16px;color:#fbbf24;font-weight:700;">{{ $data['byService']->sum('waiting_count') }}</td>
                        <td style="text-align:center;padding:12px 16px;color:#f87171;font-weight:700;">{{ $data['byService']->sum('lost_count') }}</td>
                        <td style="text-align:right;padding:12px 16px;color:#e2e8f0;font-weight:700;">EGP {{ number_format($data['byService']->sum('total_sell'), 0) }}</td>
                        <td style="text-align:right;padding:12px 16px;color:#64748b;font-weight:700;">EGP {{ number_format($data['byService']->sum('total_net'), 0) }}</td>
                        <td style="text-align:right;padding:12px 16px;color:#4ade80;font-weight:800;font-size:14px;">EGP {{ number_format($data['byService']->sum('total_profit'), 0) }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

    {{-- ══════════════════════════ MONTHLY ══ --}}
    @if ($data['byMonth']->isNotEmpty())
    <div class="ar-section" style="border:1px solid #1e293b; background:#0f172a; margin-bottom:20px;">
        <div class="ar-section-header" style="background:#1e293b; border-color:#334155;">
            <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:16px;">📅</span>
                <span style="font-weight:700; color:#f1f5f9; font-size:14px;">Monthly Performance</span>
            </div>
            <span style="font-size:12px;color:#64748b;">{{ $data['byMonth']->count() }} month(s)</span>
        </div>
        <div style="overflow-x:auto;">
            <table class="ar-table" style="width:100%;border-collapse:collapse;">
                <thead>
                    <tr style="background:#1a2332; color:#64748b;">
                        <th style="text-align:left;">Month</th>
                        <th style="text-align:center;">Total</th>
                        <th style="text-align:center;">Done</th>
                        <th style="text-align:center;">Waiting</th>
                        <th style="text-align:right;">Revenue</th>
                        <th style="text-align:right;">Profit</th>
                        <th style="text-align:right;">Collected</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($data['byMonth'] as $i => $row)
                        <tr class="ar-row-hover" style="border-top:1px solid #1e293b; {{ $i % 2 === 1 ? 'background:rgba(255,255,255,0.015);' : '' }}">
                            <td style="font-weight:700; color:#e2e8f0;">{{ $row->month_label }}</td>
                            <td style="text-align:center;color:#94a3b8;">{{ $row->count }}</td>
                            <td style="text-align:center;font-weight:600;color:#4ade80;">{{ $row->done_count }}</td>
                            <td style="text-align:center;font-weight:600;color:#fbbf24;">{{ $row->waiting_count }}</td>
                            <td style="text-align:right;color:#cbd5e1;font-weight:500;">EGP {{ number_format($row->total_sell, 0) }}</td>
                            <td style="text-align:right;font-weight:700;color:#4ade80;">EGP {{ number_format($row->total_profit, 0) }}</td>
                            <td style="text-align:right;color:#60a5fa;">EGP {{ number_format($row->total_collected, 0) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    @endif

    {{-- ══════════════════════════ OUTSTANDING ══ --}}
    @if ($data['outstanding']->isNotEmpty())
    <div class="ar-section" style="border:1px solid #431407; background:#0f172a; margin-bottom:20px;">
        <div class="ar-section-header" style="background:#1c0a02; border-color:#431407;">
            <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:16px;">⚠️</span>
                <div>
                    <p style="font-weight:700; color:#fed7aa; font-size:14px;">Outstanding Balances</p>
                    <p style="font-size:11px;color:#92400e;margin-top:1px;">Services delivered — payment incomplete</p>
                </div>
            </div>
            <div style="text-align:right;">
                <p style="font-size:11px;color:#92400e;text-transform:uppercase;font-weight:700;letter-spacing:.06em;">Total Due</p>
                <p style="font-size:22px;font-weight:800;color:#fb923c;">EGP {{ number_format($data['totalOutstanding'], 0) }}</p>
            </div>
        </div>

        <div style="background:#1c0d02;border-bottom:1px solid #431407;padding:12px 20px;">
            <p style="font-size:12px;color:#a16207;line-height:1.6;">
                <strong style="color:#fbbf24;">What is "Outstanding Balance"?</strong>
                These are completed (Done) deals where you already delivered the service to the client,
                but they have not paid the full amount yet. The <strong style="color:#fb923c;">Balance Due</strong>
                column shows exactly how much each client still owes you.
            </p>
        </div>

        <div style="overflow-x:auto;">
            <table class="ar-table" style="width:100%;border-collapse:collapse;">
                <thead>
                    <tr style="background:#1a0e02; color:#92400e;">
                        <th style="text-align:left;">Client</th>
                        <th style="text-align:left;">Service</th>
                        <th style="text-align:center;">Date</th>
                        <th style="text-align:right;">Sell Price</th>
                        <th style="text-align:right;">Collected</th>
                        <th style="text-align:right;">Balance Due</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($data['outstanding'] as $i => $row)
                        @php $paidPct = $row->sell_price > 0 ? round(($row->current_money / $row->sell_price) * 100) : 0; @endphp
                        <tr class="ar-row-hover" style="border-top:1px solid #431407; {{ $i % 2 === 1 ? 'background:rgba(251,146,60,0.03);' : '' }}">
                            <td style="font-weight:700;color:#fed7aa;">{{ $row->client_name }}</td>
                            <td style="color:#d97706;max-width:180px;">
                                <span style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="{{ $row->service }}">{{ $row->service ?: '—' }}</span>
                            </td>
                            <td style="text-align:center;color:#92400e;font-size:12px;white-space:nowrap;">{{ $row->transaction_date?->format('d/m/Y') }}</td>
                            <td style="text-align:right;color:#fde68a;font-weight:500;">EGP {{ number_format($row->sell_price, 0) }}</td>
                            <td style="text-align:right;">
                                <span style="color:#4ade80;font-weight:600;">EGP {{ number_format($row->current_money, 0) }}</span>
                                <span style="color:#374151;font-size:11px;margin-left:3px;">({{ $paidPct }}%)</span>
                            </td>
                            <td style="text-align:right;">
                                <span style="display:inline-block;background:#431407;color:#fb923c;font-weight:800;font-size:13px;padding:4px 14px;border-radius:8px;white-space:nowrap;">
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

    {{-- ══════════════════════════ TOP CLIENTS ══ --}}
    <div class="ar-section" style="border:1px solid #1e293b; background:#0f172a; margin-bottom:20px;">
        <div class="ar-section-header" style="background:#1e293b; border-color:#334155;">
            <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:18px;">🏆</span>
                <span style="font-weight:700; color:#f1f5f9; font-size:14px;">Top 10 Clients by Profit</span>
            </div>
        </div>
        <div style="overflow-x:auto;">
            <table class="ar-table" style="width:100%;border-collapse:collapse;">
                <thead>
                    <tr style="background:#1a2332; color:#64748b;">
                        <th style="text-align:center;width:50px;">#</th>
                        <th style="text-align:left;">Client</th>
                        <th style="text-align:center;">Services</th>
                        <th style="text-align:right;">Revenue</th>
                        <th style="text-align:right;">Profit</th>
                        <th style="text-align:right;">Collected</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($data['topClients'] as $i => $row)
                        @php
                            $medals = ['🥇','🥈','🥉'];
                            $medal = $medals[$i] ?? null;
                        @endphp
                        <tr class="ar-row-hover" style="border-top:1px solid #1e293b; {{ $i < 3 ? 'background:rgba(234,179,8,0.04);' : ($i % 2 === 1 ? 'background:rgba(255,255,255,0.015);':'') }}">
                            <td style="text-align:center;font-size:18px;">
                                @if($medal)
                                    {{ $medal }}
                                @else
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#1e293b;color:#64748b;font-size:11px;font-weight:700;">{{ $i+1 }}</span>
                                @endif
                            </td>
                            <td style="font-weight:{{ $i < 3 ? '700' : '600' }};color:{{ $i < 3 ? '#fde68a' : '#e2e8f0' }};">{{ $row->client_name }}</td>
                            <td style="text-align:center;">
                                <span class="ar-badge" style="background:#1e3a5f;color:#60a5fa;">{{ $row->count }}</span>
                            </td>
                            <td style="text-align:right;color:#cbd5e1;font-weight:500;">EGP {{ number_format($row->total_sell, 0) }}</td>
                            <td style="text-align:right;font-weight:700;color:#4ade80;">EGP {{ number_format($row->total_profit, 0) }}</td>
                            <td style="text-align:right;color:#60a5fa;">EGP {{ number_format($row->total_collected ?? 0, 0) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <p style="text-align:center;font-size:11px;color:#334155;padding-bottom:16px;">
        Generated {{ now()->format('d M Y, H:i') }} &middot; Ease Travel Accounting System
    </p>

</x-filament-panels::page>
