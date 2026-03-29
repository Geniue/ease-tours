<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::where('is_active', true)
            ->withCount('trips')
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $categories,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $category = Category::where('is_active', true)
            ->where(function ($q) use ($slug) {
                $q->where('slug_en', $slug)
                    ->orWhere('slug_ar', $slug);
            })
            ->with(['trips' => function ($q) {
                $q->where('is_active', true)->orderBy('created_at', 'desc');
            }])
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $category,
        ]);
    }
}
