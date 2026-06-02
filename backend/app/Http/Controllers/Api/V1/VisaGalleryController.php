<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\VisaGalleryItem;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class VisaGalleryController extends Controller
{
    public function index(Request $request)
    {
        $fields = $request->input('fields');
        $query = VisaGalleryItem::query()
            ->publicSafe()
            ->with($this->governorateRelation())
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderByDesc('published_at');

        $this->applyFilters($query, $request);

        if ($fields === 'sitemap') {
            $items = $query
                ->select(['id', 'slug_ar', 'slug_en', 'published_at', 'created_at', 'updated_at'])
                ->limit(min((int) ($request->limit ?? 500), 500))
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $items,
            ]);
        }

        $this->applyListFields($query, $fields);

        $perPage = min((int) ($request->per_page ?? 24), 60);
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
        $item = VisaGalleryItem::query()
            ->publicSafe()
            ->with($this->governorateRelation())
            ->where(function ($query) use ($slug) {
                $query->where('slug_ar', $slug)
                    ->orWhere('slug_en', $slug);
            })
            ->firstOrFail();

        $related = VisaGalleryItem::query()
            ->publicSafe()
            ->with($this->governorateRelation())
            ->whereKeyNot($item->id)
            ->where(function ($query) use ($item) {
                $query->where('country_ar', $item->country_ar)
                    ->orWhere('city_ar', $item->city_ar);

                if ($item->country_en) {
                    $query->orWhere('country_en', $item->country_en);
                }

                if ($item->city_en) {
                    $query->orWhere('city_en', $item->city_en);
                }

                if ($item->governorate_id) {
                    $query->orWhere('governorate_id', $item->governorate_id);
                }
            })
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderByDesc('published_at')
            ->limit(8)
            ->get();

        $data = $item->toArray();
        $data['related_items'] = $related;

        return response()->json([
            'status' => 'success',
            'data' => $data,
        ]);
    }

    private function governorateRelation(): array
    {
        return [
            'governorate:id,name_ar,name_en,slug_ar,slug_en,region_ar,region_en',
        ];
    }

    private function applyFilters(Builder $query, Request $request): void
    {
        if ($request->filled('region')) {
            $query->where('region', $request->input('region'));
        }

        if ($request->filled('country')) {
            $country = $request->input('country');
            $query->where(function ($q) use ($country) {
                $q->where('country_ar', $country)
                    ->orWhere('country_en', $country);
            });
        }

        if ($request->filled('governorate_id')) {
            $query->where('governorate_id', (int) $request->input('governorate_id'));
        }

        if ($request->filled('city')) {
            $city = $request->input('city');
            $query->where(function ($q) use ($city) {
                $q->where('city_ar', $city)
                    ->orWhere('city_en', $city);
            });
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }
    }

    private function applyListFields(Builder $query, ?string $fields): void
    {
        if ($fields !== 'card') {
            return;
        }

        $query->select([
            'id',
            'title_ar',
            'title_en',
            'slug_ar',
            'slug_en',
            'country_ar',
            'country_en',
            'visa_type_ar',
            'visa_type_en',
            'region',
            'city_ar',
            'city_en',
            'governorate_id',
            'processed_month',
            'processed_year',
            'processing_days',
            'image_path',
            'alt_ar',
            'alt_en',
            'summary_ar',
            'summary_en',
            'is_redacted',
            'has_client_consent',
            'is_featured',
            'published_at',
            'updated_at',
            'sort_order',
        ]);
    }
}
