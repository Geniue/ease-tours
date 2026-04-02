<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::with('category')
            ->where('is_published', true);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $query->orderBy('published_at', 'desc');

        // Flat list when limit is specified (homepage featured, sitemap, related)
        if ($request->has('limit')) {
            $blogs = $query->limit(min((int) $request->limit, 500))->get();
            return response()->json([
                'status' => 'success',
                'data' => $blogs,
            ]);
        }

        // Paginated response
        $perPage = min((int) ($request->per_page ?? 9), 50);
        $paginated = $query->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $paginated->items(),
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
        ]);
    }

    public function show(string $slug)
    {
        $blog = Blog::with('category')
            ->where('is_published', true)
            ->where(function ($q) use ($slug) {
                $q->where('slug_en', $slug)
                  ->orWhere('slug_ar', $slug);
            })
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $blog,
        ]);
    }
}
