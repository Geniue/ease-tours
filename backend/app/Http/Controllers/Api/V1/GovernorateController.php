<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Governorate;
use Illuminate\Http\Request;

class GovernorateController extends Controller
{
    public function index(Request $request)
    {
        $query = Governorate::where('is_published', true)
            ->orderBy('sort_order');

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->has('region')) {
            $query->where('region_en', $request->region);
        }

        if ($request->has('limit')) {
            $governorates = $query->limit(min((int) $request->limit, 100))->get();
            return response()->json([
                'status' => 'success',
                'data' => $governorates,
            ]);
        }

        $perPage = min((int) ($request->per_page ?? 27), 50);
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
        $governorate = Governorate::where('is_published', true)
            ->where(function ($q) use ($slug) {
                $q->where('slug_en', $slug)
                  ->orWhere('slug_ar', $slug);
            })
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $governorate,
        ]);
    }
}
