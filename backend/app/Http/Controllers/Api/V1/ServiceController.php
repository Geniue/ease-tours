<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::where('is_active', true)
            ->orderBy('sort_order');

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        // Flat list when limit is specified (homepage featured, sitemap)
        if ($request->has('limit')) {
            $services = $query->limit(min((int) $request->limit, 500))->get();
            return response()->json([
                'status' => 'success',
                'data' => $services,
            ]);
        }

        // Flat list for sitemap
        if ($request->boolean('all')) {
            return response()->json([
                'status' => 'success',
                'data' => $query->get(),
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
        $service = Service::where('is_active', true)
            ->where(function ($q) use ($slug) {
                $q->where('slug_en', $slug)
                  ->orWhere('slug_ar', $slug);
            })
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $service,
        ]);
    }
}
