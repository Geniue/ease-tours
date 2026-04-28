<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\LeadEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LeadEventController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'event_type' => ['required', 'string', Rule::in([
                'booking_success',
                'contact_success',
                'newsletter_success',
                'whatsapp_click',
            ])],
            'locale' => ['nullable', Rule::in(['ar', 'en'])],
            'page_url' => ['nullable', 'string', 'max:2048'],
            'page_path' => ['nullable', 'string', 'max:2048'],
            'referrer' => ['nullable', 'string', 'max:2048'],
            'landing_page' => ['nullable', 'string', 'max:2048'],
            'cta_location' => ['nullable', 'string', 'max:120'],
            'source_type' => ['nullable', 'string', 'max:80'],
            'source_id' => ['nullable', 'integer'],
            'trip_id' => ['nullable', 'integer', 'exists:trips,id'],
            'service_id' => ['nullable', 'integer', 'exists:services,id'],
            'blog_id' => ['nullable', 'integer', 'exists:blogs,id'],
            'booking_id' => ['nullable', 'integer', 'exists:bookings,id'],
            'contact_message_id' => ['nullable', 'integer', 'exists:contact_messages,id'],
            'subscriber_id' => ['nullable', 'integer', 'exists:subscribers,id'],
            'utm_source' => ['nullable', 'string', 'max:255'],
            'utm_medium' => ['nullable', 'string', 'max:255'],
            'utm_campaign' => ['nullable', 'string', 'max:255'],
            'utm_term' => ['nullable', 'string', 'max:255'],
            'utm_content' => ['nullable', 'string', 'max:255'],
            'metadata' => ['nullable', 'array'],
        ]);

        $data['ip_address'] = $request->ip();
        $data['user_agent'] = mb_substr((string) $request->userAgent(), 0, 1000);

        $event = LeadEvent::create($data);

        return response()->json([
            'status' => 'success',
            'data' => ['id' => $event->id],
        ], 201);
    }
}
