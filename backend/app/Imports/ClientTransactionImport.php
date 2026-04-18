<?php

namespace App\Imports;

use App\Models\ClientTransaction;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;

class ClientTransactionImport
{
    private int $imported = 0;

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

    public function import(mixed $file): void
    {
        $path        = is_string($file) ? $file : $file->getRealPath();
        $spreadsheet = IOFactory::load($path);
        $sheet       = $spreadsheet->getActiveSheet();

        // ── Find header row ─────────────────────────────────────────────
        $headerRowNum = null;
        $colMap       = []; // column letter/index → canonical key

        foreach ($sheet->getRowIterator() as $row) {
            $cells  = $row->getCellIterator();
            $cells->setIterateOnlyExistingCells(false);

            $rowValues = [];
            foreach ($cells as $cell) {
                $rowValues[$cell->getColumn()] = strtolower(trim((string) $cell->getValue()));
            }

            if (
                in_array('date', $rowValues, true) &&
                (in_array('clint', $rowValues, true) || in_array('client', $rowValues, true))
            ) {
                $headerRowNum = $row->getRowIndex();

                foreach ($rowValues as $col => $label) {
                    $key = self::COLUMN_MAP[$label] ?? null;
                    if ($key) {
                        $colMap[$col] = $key;
                    }
                }
                break;
            }
        }

        if ($headerRowNum === null || empty($colMap)) {
            return;
        }

        // ── Process data rows ────────────────────────────────────────────
        $highestRow = $sheet->getHighestDataRow();

        for ($rowNum = $headerRowNum + 1; $rowNum <= $highestRow; $rowNum++) {

            // Build associative array from detected column positions
            $data = [];
            foreach ($colMap as $col => $key) {
                $cell        = $sheet->getCell($col . $rowNum);
                $data[$key]  = $cell->getCalculatedValue();
            }

            $clientName = trim((string) ($data['client'] ?? ''));
            if (empty($clientName)) {
                continue;
            }

            $netPrice  = $this->parseAmount($data['net_price']  ?? 0);
            $sellPrice = $this->parseAmount($data['sell_price'] ?? 0);

            // ── Detect row background colour ─────────────────────────────
            // Red background → client cancelled (lost)
            // Blue background → money not collected (LOST in current_money)
            // We read the fill of the first data column
            $firstCol    = array_key_first($colMap);
            $fillRgb     = $sheet
                ->getStyle($firstCol . $rowNum)
                ->getFill()
                ->getStartColor()
                ->getRGB();

            $colorStatus = $this->colorToStatus($fillRgb);

            // Explicit status from the "case" column wins unless colour says "lost"
            $textStatus = $this->parseStatus($data['status'] ?? 'waiting');
            $status     = ($colorStatus === 'lost') ? 'lost' : $textStatus;

            // current_money: "LOST" text or blue row → null (not collected)
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
                'transaction_date' => $this->parseDate($data['date']      ?? null),
                'client_name'      => $clientName,
                'service'          => trim((string) ($data['service']     ?? '')),
                'status'           => $status,
                'follow_up_date'   => $this->parseDate($data['follow_up'] ?? null),
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

    // ── Colour detection ─────────────────────────────────────────────────

    private function colorToStatus(string $rgb): ?string
    {
        if (strlen($rgb) !== 6) {
            return null;
        }

        $r = hexdec(substr($rgb, 0, 2));
        $g = hexdec(substr($rgb, 2, 2));
        $b = hexdec(substr($rgb, 4, 2));

        // Red: R dominant, G and B low → cancelled/lost
        if ($r > 150 && $r > $g * 1.8 && $r > $b * 1.8) {
            return 'lost';
        }

        return null;
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    private function parseDate(mixed $value): ?string
    {
        if ($value === null || trim((string) $value) === '') {
            return null;
        }

        if (is_numeric($value)) {
            try {
                return ExcelDate::excelToDateTimeObject((float) $value)->format('Y-m-d');
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
