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
        $fields = $request->input('fields');
        $query = Blog::query()->where('is_published', true);

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
            if ($fields === 'sitemap') {
                $blogs = $query
                    ->select(['id', 'slug_ar', 'slug_en', 'updated_at'])
                    ->limit(min((int) $request->limit, 500))
                    ->get();

                return response()->json([
                    'status' => 'success',
                    'data' => $blogs,
                ]);
            }

            $this->applyListFields($query, $fields);
            $blogs = $query->limit(min((int) $request->limit, 500))->get();
            return response()->json([
                'status' => 'success',
                'data' => $blogs,
            ]);
        }

        // Paginated response
        $this->applyListFields($query, $fields);
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

    private function applyListFields($query, ?string $fields): void
    {
        if ($fields === 'card') {
            $query
                ->select([
                    'id',
                    'category_id',
                    'author_id',
                    'title_ar',
                    'title_en',
                    'slug_ar',
                    'slug_en',
                    'excerpt_ar',
                    'excerpt_en',
                    'featured_image',
                    'direction',
                    'is_published',
                    'is_featured',
                    'published_at',
                    'updated_at',
                    'seo_title_ar',
                    'seo_title_en',
                    'seo_description_ar',
                    'seo_description_en',
                    'keywords_ar',
                    'keywords_en',
                ])
                ->with([
                    'category:id,name_ar,name_en,slug_ar,slug_en,type',
                    'author:id,name_ar,name_en,slug_ar,slug_en,expertise_ar,expertise_en,bio_ar,bio_en,photo,social_twitter,social_linkedin,social_facebook,is_active',
                    'tags:id,name_ar,name_en,slug_ar,slug_en,description_ar,description_en',
                ]);

            return;
        }

        $query->with(['category', 'author', 'tags']);
    }
}
