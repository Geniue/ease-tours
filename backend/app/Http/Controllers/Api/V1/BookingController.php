<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Mail\BookingNotification;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'trip_id' => 'required|exists:trips,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:255',
            'num_passengers' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:1000',
        ]);

        $trip = \App\Models\Trip::findOrFail($validated['trip_id']);

        $price = $trip->discounted_price ?? $trip->base_price;
        $validated['total_price'] = $price * $validated['num_passengers'];
        $validated['currency'] = $trip->currency;
        $validated['status'] = 'pending';

        $booking = Booking::create($validated);

        Mail::to(config('mail.addresses.sales', 'sales@ease-travel.online'))->send(new BookingNotification($booking->load('trip')));

        return response()->json([
            'status' => 'success',
            'data' => $booking->load('trip'),
        ], 201);
    }
}
