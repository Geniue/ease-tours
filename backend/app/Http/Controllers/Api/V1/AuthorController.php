<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Author;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::where('is_active', true)
            ->withCount(['blogs' => fn ($q) => $q->where('is_published', true)])
            ->orderBy('name_en')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $authors,
        ]);
    }

    public function show(string $slug)
    {
        $author = Author::where('is_active', true)
            ->where(function ($q) use ($slug) {
                $q->where('slug_en', $slug)->orWhere('slug_ar', $slug);
            })
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $author,
        ]);
    }
}
