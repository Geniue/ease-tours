<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'trip_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'num_passengers',
        'notes',
        'status',
        'total_price',
        'currency',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
    ];

    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }
}
