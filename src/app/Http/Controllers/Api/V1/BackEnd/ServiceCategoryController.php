<?php

namespace App\Http\Controllers\Api\V1\BackEnd;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\ServiceCategory;

class ServiceCategoryController extends Controller
{
    /**
     * Display a listing of the service categories.
     */
    public function index($categoryId)
    {
        $serviceCategories = ServiceCategory::where('category_id', $categoryId)->get();
        return response()->json($serviceCategories,200);
    }
}