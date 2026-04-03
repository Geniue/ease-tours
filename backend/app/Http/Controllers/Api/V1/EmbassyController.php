<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Embassy;
use Illuminate\Http\Request;

class EmbassyController extends Controller
{
    public function index(Request $request)
    {
        $query = Embassy::where('is_active', true)
            ->orderBy('sort_order');

        if ($request->has('status')) {
            $query->where('appointment_status', $request->status);
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->get(),
        ]);
    }

    public function show(string $slug)
    {
        $embassy = Embassy::where('is_active', true)
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $embassy,
        ]);
    }
}
