<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_date',
        'client_name',
        'service',
        'status',
        'follow_up_date',
        'net_price',
        'sell_price',
        'profit',
        'current_money',
        'notes',
    ];

    protected $casts = [
        'transaction_date' => 'date',
        'follow_up_date'   => 'date',
        'net_price'        => 'decimal:2',
        'sell_price'       => 'decimal:2',
        'profit'           => 'decimal:2',
        'current_money'    => 'decimal:2',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $model) {
            $model->profit = $model->sell_price - $model->net_price;
        });
    }
}
