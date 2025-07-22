<?php
namespace App\Http\Controllers\Api\V1\BackEnd;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\ServiceCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{


    public function index(Request $request): JsonResponse
    {
        // Pagination params
        $limit = (int) $request->input('limit', 10);   // default 10
        $page = (int) $request->input('page', 1);      // default page 1
        $offset = ($page - 1) * $limit;

        // Sorting params
        $sort = $request->input('sort', 'id');         // default sort field
        $direction = $request->input('direction', 'asc');

        $allowedSortFields = ['id', 'name'];
        if (!in_array($sort, $allowedSortFields)) {
            $sort = 'id';
        }
        if (!in_array(strtolower($direction), ['asc', 'desc'])) {
            $direction = 'asc';
        }

        // Base query
        $query = Category::query()->withCount('serviceProviders');

        // Search
        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        // Total records
        $total = $query->count();
        $lastPage = $total > 0 ? ceil($total / $limit) : 1;

        // Apply sorting, offset, limit
        $categories = $query->orderBy($sort, $direction)
            ->skip($offset)
            ->take($limit)
            ->get();

        // Response with pagination meta
        return response()->json([
            'data' => $categories,
            'current_page' => $page,
            'per_page' => $limit,
            'total' => $total,
            'last_page' => $lastPage,
            'sort' => $sort,
            'direction' => $direction,
        ], 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Generate alias from name
        $validated['alias'] = Str::slug($validated['name']);

        $category = Category::create($validated);

        return response()->json([
            'message' => 'Category created successfully',
            'data' => $category
        ], 201); // 201 Created
    }

    public function update(Request $request, $id): JsonResponse
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
        ]);

        // If name is provided, regenerate alias
        if (isset($validated['name'])) {
            $validated['alias'] = Str::slug($validated['name']);
        }

        $category->update($validated);

        return response()->json([
            'message' => 'Category updated successfully',
            'data' => $category
        ], 200); // 200 OK
    }

    public function serviceCategory($categoryId): JsonResponse
    {
        $serviceCategories = ServiceCategory::where('category_id', $categoryId)->get();
        return response()->json($serviceCategories, 200);
    }
}