<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\ServiceProvider;

use Illuminate\Http\Request;

class ServiceProviderController extends Controller
{

    public function index(Request $request)
    {
        // Get all category names
        $categories = Category::select('name')->get();
    
        // Get service providers limited to 20, with relationships
        $serviceProviders = ServiceProvider::with(['user', 'serviceCategory', 'media'])
            ->limit(20)
            ->get();
    
        // Structure the JSON response
        return response()->json([
            'categories' => $categories,
            'service_providers' => $serviceProviders,
        ]);
    }
    
}
