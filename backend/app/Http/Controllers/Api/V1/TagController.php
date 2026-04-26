<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::withCount(['blogs' => fn ($q) => $q->where('is_published', true)])
            ->having('blogs_count', '>', 0)
            ->orderBy('name_en')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $tags,
        ]);
    }

    public function show(string $slug)
    {
        $tag = Tag::where('slug_en', $slug)
            ->orWhere('slug_ar', $slug)
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $tag,
        ]);
    }
}
