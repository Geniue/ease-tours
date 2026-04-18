<?php

namespace App\Imports;

use App\Models\ClientTransaction;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Illuminate\Support\Collection;

class ClientTransactionImport implements ToCollection, WithCalculatedFormulas
{
    private int $imported = 0;

    // Known header names → our canonical key
    private const COLUMN_MAP = [
        'date'          => 'date',
        'clint'         => 'client',
        'client'        => 'client',
        'client_name'   => 'client',
        'service'       => 'service',
        'case'          => 'status',
        'status'        => 'status',
        'follow_up'     => 'follow_up',
        'follw_up'      => 'follow_up',
        'follow up'     => 'follow_up',
        'follw up'      => 'follow_up',
        'net_price'     => 'net_price',
        'net price'     => 'net_price',
        'net'           => 'net_price',
        'sell_price'    => 'sell_price',
        'sell price'    => 'sell_price',
        'sell'          => 'sell_price',
        'profit'        => 'profit',
        'current_mony'  => 'current_money',
        'current_money' => 'current_money',
        'current mony'  => 'current_money',
        'current money' => 'current_money',
        'current mon'   => 'current_money',
    ];

    public function collection(Collection $rows): void
    {
        // ── Step 1: find the header row ──────────────────────────────────
        // Scan every row looking for one that contains "clint" or "client"
        // alongside "date" — that's our header regardless of its position.
        $headerIndex = null;
        $colMap      = [];  // column position → canonical key

        foreach ($rows as $i => $row) {
            $normalized = $row->map(fn ($v) => strtolower(trim((string) $v)));

            if (
                $normalized->contains('date') &&
                ($normalized->contains('clint') || $normalized->contains('client'))
            ) {
                $headerIndex = $i;

                foreach ($normalized as $pos => $label) {
                    $key = self::COLUMN_MAP[$label] ?? null;
                    if ($key) {
                        $colMap[$pos] = $key;
                    }
                }
                break;
            }
        }

        if ($headerIndex === null || empty($colMap)) {
            return; // no recognisable header found
        }

        // ── Step 2: process every row after the header ───────────────────
        foreach ($rows->slice($headerIndex + 1) as $row) {
            // Build an associative array using detected column positions
            $data = [];
            foreach ($colMap as $pos => $key) {
                $data[$key] = $row[$pos] ?? null;
            }

            $clientName = trim((string) ($data['client'] ?? ''));
            if (empty($clientName)) {
                continue;
            }

            $netPrice  = $this->parseAmount($data['net_price']  ?? 0);
            $sellPrice = $this->parseAmount($data['sell_price'] ?? 0);

            // Skip rows where both prices are zero and the name looks like a
            // formula artefact (all-numeric or single char)
            if ($netPrice === 0.0 && $sellPrice === 0.0 && strlen($clientName) <= 1) {
                continue;
            }

            $rawMoney     = $data['current_money'] ?? null;
            $currentMoney = null;
            if (
                $rawMoney !== null &&
                strtolower(trim((string) $rawMoney)) !== 'lost' &&
                is_numeric($rawMoney)
            ) {
                $currentMoney = (float) $rawMoney;
            }

            ClientTransaction::create([
                'transaction_date' => $this->parseDate($data['date']       ?? null),
                'client_name'      => $clientName,
                'service'          => trim((string) ($data['service']      ?? '')),
                'status'           => $this->parseStatus($data['status']   ?? 'waiting'),
                'follow_up_date'   => $this->parseDate($data['follow_up']  ?? null),
                'net_price'        => $netPrice,
                'sell_price'       => $sellPrice,
                'profit'           => $sellPrice - $netPrice,
                'current_money'    => $currentMoney,
            ]);

            $this->imported++;
        }
    }

    public function getImportedCount(): int
    {
        return $this->imported;
    }

    private function parseDate(mixed $value): ?string
    {
        if ($value === null || trim((string) $value) === '') {
            return null;
        }

        // Excel serial number
        if (is_numeric($value)) {
            try {
                return \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject((float) $value)
                    ->format('Y-m-d');
            } catch (\Throwable) {
                return null;
            }
        }

        $v = trim((string) $value);

        foreach (['d/m/Y', 'd/m/y', 'Y-m-d', 'm/d/Y', 'd-m-Y', 'd\\m\\Y'] as $fmt) {
            $d = \DateTime::createFromFormat($fmt, $v);
            if ($d !== false) {
                return $d->format('Y-m-d');
            }
        }

        try {
            return Carbon::parse($v)->format('Y-m-d');
        } catch (\Throwable) {
            return null;
        }
    }

    private function parseAmount(mixed $value): float
    {
        $cleaned = preg_replace('/[^0-9.]/', '', (string) ($value ?? ''));
        return (float) ($cleaned ?: 0);
    }

    private function parseStatus(mixed $value): string
    {
        $v = strtolower(trim((string) ($value ?? '')));

        return match (true) {
            str_contains($v, 'done') => 'done',
            str_contains($v, 'lost') => 'lost',
            default                  => 'waiting',
        };
    }
}
