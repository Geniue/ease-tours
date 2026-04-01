<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Mail\ContactMessageNotification;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'required|string|max:2000',
        ]);

        $validated['status'] = 'new';

        $contact = ContactMessage::create($validated);

        Mail::to(config('mail.addresses.sales', 'sales@ease-travel.online'))->send(new ContactMessageNotification($contact));

        return response()->json([
            'status' => 'success',
            'data' => $contact,
        ], 201);
    }
}
