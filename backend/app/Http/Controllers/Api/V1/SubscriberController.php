<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SubscriberController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:160'],
            'locale' => ['nullable', Rule::in(['ar', 'en'])],
            'source' => ['nullable', 'string', 'max:80'],
        ]);

        $subscriber = Subscriber::firstOrCreate(
            ['email' => strtolower($data['email'])],
            [
                'locale' => $data['locale'] ?? 'ar',
                'source' => $data['source'] ?? null,
                'is_active' => true,
            ]
        );

        return response()->json([
            'status' => 'success',
            'data' => ['email' => $subscriber->email],
        ], $subscriber->wasRecentlyCreated ? 201 : 200);
    }
}
