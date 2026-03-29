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

        if ($request->has('limit')) {
            $query->limit(min((int) $request->limit, 50));
        }

        $blogs = $query->orderBy('published_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $blogs,
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
