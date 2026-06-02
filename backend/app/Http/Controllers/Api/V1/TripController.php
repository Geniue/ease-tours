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
        $fields = $request->input('fields');
        $query = Trip::query()->where('is_active', true);

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

        if ($fields === 'sitemap') {
            $trips = $query
                ->select(['id', 'slug_ar', 'slug_en', 'created_at', 'updated_at'])
                ->orderBy('created_at', 'desc')
                ->limit(min($request->integer('limit', 500), 500))
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $trips,
            ]);
        }

        $this->applyListFields($query, $fields);

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

    private function applyListFields($query, ?string $fields): void
    {
        if ($fields === 'card') {
            $query
                ->select([
                    'id',
                    'category_id',
                    'title_ar',
                    'title_en',
                    'slug_ar',
                    'slug_en',
                    'destination_ar',
                    'destination_en',
                    'duration_days',
                    'base_price',
                    'discounted_price',
                    'currency',
                    'featured_image',
                    'video',
                    'video_thumbnail',
                    'is_featured',
                    'is_active',
                    'coming_soon',
                    'start_date',
                    'end_date',
                    'max_participants',
                    'created_at',
                    'updated_at',
                ])
                ->with('category:id,name_ar,name_en,slug_ar,slug_en,type');

            return;
        }

        $query->with('category', 'images');
    }
}
