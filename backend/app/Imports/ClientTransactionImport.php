<?php

namespace App\Imports;

use App\Models\ClientTransaction;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\WithStartRow;

class ClientTransactionImport implements ToModel, WithHeadingRow, SkipsEmptyRows
{
    private int $imported = 0;

    public function model(array $row): ?ClientTransaction
    {
        // Skip rows with no client name
        $clientName = trim($row['clint'] ?? $row['client'] ?? $row['client_name'] ?? '');
        if (empty($clientName)) {
            return null;
        }

        $netPrice  = $this->parseAmount($row['net_price'] ?? $row['net'] ?? 0);
        $sellPrice = $this->parseAmount($row['sell_price'] ?? $row['sell'] ?? 0);
        $status    = $this->parseStatus($row['case'] ?? $row['status'] ?? 'waiting');

        // current_money: skip "LOST" string, treat as null
        $rawMoney    = $row['current_mony'] ?? $row['current_money'] ?? null;
        $currentMoney = null;
        if ($rawMoney !== null && strtolower(trim((string) $rawMoney)) !== 'lost' && is_numeric($rawMoney)) {
            $currentMoney = (float) $rawMoney;
        }

        $this->imported++;

        return new ClientTransaction([
            'transaction_date' => $this->parseDate($row['date'] ?? null),
            'client_name'      => $clientName,
            'service'          => trim($row['service'] ?? ''),
            'status'           => $status,
            'follow_up_date'   => $this->parseDate($row['follow_up'] ?? $row['follw_up'] ?? null),
            'net_price'        => $netPrice,
            'sell_price'       => $sellPrice,
            'profit'           => $sellPrice - $netPrice,
            'current_money'    => $currentMoney,
        ]);
    }

    public function getImportedCount(): int
    {
        return $this->imported;
    }

    private function parseDate(mixed $value): ?string
    {
        if (empty($value)) {
            return null;
        }

        // Excel serial date number
        if (is_numeric($value)) {
            try {
                return \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject((float) $value)
                    ->format('Y-m-d');
            } catch (\Throwable) {
                return null;
            }
        }

        $value = trim((string) $value);
        if (empty($value)) {
            return null;
        }

        try {
            // Try common formats: d/m/Y, d/m/y, Y-m-d
            foreach (['d/m/Y', 'd/m/y', 'Y-m-d', 'm/d/Y', 'd-m-Y'] as $format) {
                $date = \DateTime::createFromFormat($format, $value);
                if ($date !== false) {
                    return $date->format('Y-m-d');
                }
            }
            return Carbon::parse($value)->format('Y-m-d');
        } catch (\Throwable) {
            return null;
        }
    }

    private function parseAmount(mixed $value): float
    {
        if (empty($value)) {
            return 0.0;
        }
        $cleaned = preg_replace('/[^0-9.]/', '', (string) $value);
        return (float) ($cleaned ?: 0);
    }

    private function parseStatus(mixed $value): string
    {
        $v = strtolower(trim((string) ($value ?? '')));
        return match(true) {
            str_contains($v, 'done')    => 'done',
            str_contains($v, 'lost')    => 'lost',
            default                     => 'waiting',
        };
    }
}
