<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Embassy extends Model
{
    use HasFactory;

    protected $fillable = [
        'country_name_ar',
        'country_name_en',
        'slug',
        'flag_emoji',
        'appointment_status',
        'next_open_date',
        'next_close_date',
        'appointment_price',
        'price_currency',
        'notes_ar',
        'notes_en',
        'stopped_visas_ar',
        'stopped_visas_en',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'next_open_date' => 'date',
        'next_close_date' => 'date',
        'appointment_price' => 'decimal:2',
    ];
}
