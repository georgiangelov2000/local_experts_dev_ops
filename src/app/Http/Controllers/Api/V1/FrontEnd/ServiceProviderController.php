<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\City;
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

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
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

        $categories = Category::select('id', 'name')->get();
        $cities = City::select('id','name')->get();
        
        return response()->json([
            'categories' => $categories,
            'cities' => $cities,
            'service_providers' => $serviceProviders,
            "pagination" => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'last_page' => ceil($total / $perPage),                
            ]
        ], 200);
    }

    /**
     * Show a specific service provider + related providers.
     */
    public function show($id)
    {
        $provider = ServiceProvider::with(['user', 'serviceCategory', 'media', 'category'])
            ->find($id);

        if (!$provider) {
            return response()->json([
                'error' => 'Service provider not found',
            ], 404);
        }

        // Fetch related providers in the same category
        $relatedProviders = ServiceProvider::with(['user', 'serviceCategory', 'media'])
            ->where('category_id', $provider->category_id)
            ->limit(5)
            ->get();

        return response()->json([
            'service_provider' => $provider,
            'related_providers' => $relatedProviders,
        ], 200);
    }

}
