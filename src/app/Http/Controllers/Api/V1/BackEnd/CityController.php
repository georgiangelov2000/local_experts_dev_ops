<?php

namespace App\Http\Controllers\Api\V1\BackEnd;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Str;

class CityController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $limit = (int) $request->input('limit', 10);   // Records per page
        $page = (int) $request->input('page', 1);      // Current page
        $offset = ($page - 1) * $limit;                // Calculate offset

        // Default sort and direction
        $sort = $request->input('sort', 'service_providers_count'); // default sort field
        $direction = $request->input('direction', 'desc'); // default order direction

        // Base query
        $query = City::withCount('serviceProviders');

        // Search filter
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('alias', 'like', "%{$search}%");
            });
        }

        // Validate and apply sort
        $allowedSortFields = ['name', 'service_providers_count', 'id'];
        if (!in_array($sort, $allowedSortFields)) {
            $sort = 'service_providers_count';
        }
        if (!in_array(strtolower($direction), ['asc', 'desc'])) {
            $direction = 'desc';
        }

        $query->orderBy($sort, $direction);

        // Get total count for pagination
        $total = $query->count();
        $lastPage = $total > 0 ? (int) ceil($total / $limit) : 1;

        // Apply limit and offset
        $cities = $query->skip($offset)->take($limit)->get();

        // Custom response
        return response()->json([
            'data' => $cities,
            'current_page' => $page,
            'per_page' => $limit,
            'total' => $total,
            'last_page' => $lastPage,
            'sort' => $sort,
            'direction' => $direction,
        ]);
    }


    /**
     * Create a new city.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $city = City::create($validated);

        return response()->json([
            'message' => 'City created successfully',
            'data' => $city
        ], 201); // 201 Created
    }

    /**
     * Show a specific city.
     */
    public function show($id)
    {
        $city = City::findOrFail($id);

        return response()->json([
            'data' => $city
        ], 200); // 200 OK
    }

/**
 * Update a specific city.
 */
public function update(Request $request, $id)
{
    $city = City::findOrFail($id);

    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
    ]);

    // If name is provided, generate alias
    if (isset($validated['name'])) {
        $validated['alias'] = Str::slug($validated['name']);
    }

    $city->update($validated);

    return response()->json([
        'message' => 'City updated successfully',
        'data' => $city
    ], 200); // 200 OK
}

    /**
     * Delete a city.
     */
    public function destroy($id)
    {
        $city = City::findOrFail($id);
        $city->delete();

        return response()->json([
            'message' => 'City deleted successfully'
        ], 204); // 204 No Content (success, no data)
    }
}
