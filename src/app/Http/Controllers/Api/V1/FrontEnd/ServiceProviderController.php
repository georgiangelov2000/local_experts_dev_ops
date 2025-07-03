<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\City;
use App\Models\Review;
use App\Models\ServiceCategory;
use App\Models\ServiceProvider;
use Illuminate\Http\Request;


class ServiceProviderController extends Controller
{
    /**
     * List service providers + categories.
     */
    public function index(Request $request)
    {
        $query = ServiceProvider::with(['user', 'serviceCategory', 'media']);

        // Resolve names for applied filters
        $categoryName = null;
        $serviceCategoryName = null;
        $serviceProviderCategories = collect();

        if ($categoryId = $request->get('category_id')) {
            $query->where('category_id', $categoryId);
            $categoryName = Category::find($categoryId)?->name;
            $serviceProviderCategories = ServiceCategory::where('category_id', $categoryId)->get();
        }

        if ($serviceCategoryId = $request->get('service_category_id')) {
            $query->where('service_category_id', $serviceCategoryId);
            $serviceCategoryName = ServiceCategory::find($serviceCategoryId)?->name;
        }

        if ($request->has('service_category_id')) {
            $query->where('service_category_id', $request->service_category_id);
        }

        if ($request->has('term')) {
            $term = $request->term;
            $query->where(function ($q) use ($term) {
                $q->where('business_name', 'LIKE', "%{$term}%")
                    ->orWhere('description', 'LIKE', "%{$term}%");
            });
        }

        // Default values
        $perPage = $request->get('per_page', 20);
        $page = max(1, (int) $request->get('page', 1));
        $offset = ($page - 1) * $perPage;

        // Count total before limit/offset
        $total = $query->count();

        // Fetch data
        $serviceProviders = $query->limit($perPage)->offset($offset)->get();

        $categories = Category::select('id', 'name')
            ->withCount('serviceProviders')  // assuming relation name is serviceProviders
            ->get();
        $cities = City::select('id', 'name')->get();

        return response()->json([
            'categories' => $categories,
            'cities' => $cities,
            'service_providers' => $serviceProviders,
            'service_provider_categories' => $serviceProviderCategories,
            'filters' => [
                'category_name' => $categoryName,
                'service_category_name' => $serviceCategoryName,
            ],
            "pagination" => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'last_page' => ceil($total / $perPage),
            ]
        ], 200);
    }

    /**
     * Show a specific service provider + related providers + reviews.
     */
    public function show($id)
    {
        $provider = ServiceProvider::with([
            'user',
            'serviceCategory',
            'media',
            'category',
            'reviews',
            'projects'
        ])
            ->find($id);

        if (!$provider) {
            return response()->json([
                'error' => 'Service provider not found',
            ], 404);
        }

        // Fetch related providers in the same category
        $relatedProviders = ServiceProvider::with(['user', 'serviceCategory', 'media'])
            ->where('category_id', $provider->category_id)
            ->where('id', '!=', $provider->id)
            ->limit(5)
            ->get();

        return response()->json([
            'service_provider' => $provider,
            'related_providers' => $relatedProviders,
        ], 200);
    }

    /**
     * Create a review for a service provider
     */
    public function createReview(Request $request)
    {
        $validated = $request->validate([
            'review_text' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'consumer_id' => 'nullable|integer|exists:users,id',
            'service_provider_id' => 'required|integer|exists:service_providers,id',
        ]);

        $review = Review::create($validated);

        return response()->json($review, 201);
    }

    /**
     * Update a review
     */
    public function updateReview(Request $request, $id)
    {
        $review = Review::findOrFail($id);
    
        if (auth()->check() && $review->consumer_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }
    
        $validated = $request->validate([
            'review_text' => 'sometimes|required|string',
            'rating' => 'sometimes|required|integer|min:1|max:5',
        ]);
    
        $review->update($validated);
    
        return response()->json($review);
    }
    public function deleteReview($id)
    {
        $review = Review::findOrFail($id);
    
        if (auth()->check() && $review->consumer_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }
    
        $review->delete();
    
        return response()->json(['message' => 'Review deleted successfully.']);
    }
}
