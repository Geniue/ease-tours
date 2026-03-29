<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TripImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'trip_id',
        'path',
        'alt_ar',
        'alt_en',
        'sort_order',
    ];

    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }
}
