<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TripController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Trip::with('category', 'images')
            ->where('is_active', true);

        if ($request->filled('type')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('type', $request->input('type'));
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->integer('category_id'));
        }

        if ($request->filled('min_price')) {
            $query->where('base_price', '>=', $request->input('min_price'));
        }

        if ($request->filled('max_price')) {
            $query->where('base_price', '<=', $request->input('max_price'));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $trips = $query->orderBy('created_at', 'desc')
            ->paginate(min($request->integer('per_page', 12), 50));

        return response()->json([
            'status' => 'success',
            'data' => $trips,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $trip = Trip::with('category', 'images')
            ->where('is_active', true)
            ->where(function ($q) use ($slug) {
                $q->where('slug_en', $slug)
                    ->orWhere('slug_ar', $slug);
            })
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $trip,
        ]);
    }
}
