<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_type',
        'locale',
        'page_url',
        'page_path',
        'referrer',
        'landing_page',
        'cta_location',
        'source_type',
        'source_id',
        'trip_id',
        'service_id',
        'blog_id',
        'booking_id',
        'contact_message_id',
        'subscriber_id',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'metadata',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];
}
