<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    private const RELATIONS = [
        'category',
        'author',
        'tags',
        'relatedTrips.category',
        'relatedServices',
        'relatedEmbassies',
    ];

    public function index(Request $request)
    {
        $query = Blog::with(['category', 'author', 'tags'])
            ->where('is_published', true);

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('category_slug')) {
            $slug = $request->category_slug;
            $category = Category::where('slug_en', $slug)->orWhere('slug_ar', $slug)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            } else {
                return $this->emptyPaginated($request);
            }
        }

        if ($request->filled('tag_slug')) {
            $slug = $request->tag_slug;
            $tag = Tag::where('slug_en', $slug)->orWhere('slug_ar', $slug)->first();
            if ($tag) {
                $query->whereHas('tags', fn ($q) => $q->where('tags.id', $tag->id));
            } else {
                return $this->emptyPaginated($request);
            }
        }

        if ($request->filled('author_slug')) {
            $slug = $request->author_slug;
            $author = Author::where('slug_en', $slug)->orWhere('slug_ar', $slug)->first();
            if ($author) {
                $query->where('author_id', $author->id);
            } else {
                return $this->emptyPaginated($request);
            }
        }

        if ($request->filled('q')) {
            $term = '%' . trim($request->q) . '%';
            $query->where(function ($q) use ($term) {
                $q->where('title_ar', 'like', $term)
                  ->orWhere('title_en', 'like', $term)
                  ->orWhere('excerpt_ar', 'like', $term)
                  ->orWhere('excerpt_en', 'like', $term)
                  ->orWhere('keywords_ar', 'like', $term)
                  ->orWhere('keywords_en', 'like', $term);
            });
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $query->orderBy('published_at', 'desc');

        // Flat list when limit is specified (homepage featured, sitemap, related)
        if ($request->has('limit')) {
            if ($request->input('fields') === 'sitemap') {
                $blogs = $query
                    ->without(['category', 'author', 'tags'])
                    ->select(['id', 'slug_ar', 'slug_en', 'updated_at'])
                    ->limit(min((int) $request->limit, 500))
                    ->get();

                return response()->json([
                    'status' => 'success',
                    'data' => $blogs,
                ]);
            }

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
        $blog = Blog::with(self::RELATIONS)
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

    private function emptyPaginated(Request $request)
    {
        $perPage = min((int) ($request->per_page ?? 9), 50);
        return response()->json([
            'status' => 'success',
            'data' => [],
            'meta' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => $perPage,
                'total' => 0,
            ],
        ]);
    }
}
