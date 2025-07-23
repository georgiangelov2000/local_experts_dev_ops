<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('id')) {
            $category = Category::select('id', 'name', 'alias')
                ->withCount('serviceProviders')
                ->find($request->get('id'));

            if (!$category) {
                return response()->json([
                    'error' => 'Category not found'
                ], 404);
            }

            return response()->json($category, 200);
        }

        $categories = Category::select('id', 'name')
            ->withCount('serviceProviders')
            ->get();

        return response()->json($categories, 200);
    }

    public function serviceCategories($categoryId)
    {
        $serviceCategories = ServiceCategory::select('name','category_id')
        ->where('category_id', $categoryId)
            ->select('id', 'name', 'description')
            ->get();

        return response()->json($serviceCategories, 200);
    }
}
