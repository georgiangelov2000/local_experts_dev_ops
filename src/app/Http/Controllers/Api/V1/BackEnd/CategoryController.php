<?php
namespace App\Http\Controllers\Api\V1\BackEnd;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller {

    public function index(): JsonResponse{
        return response()->json(['data' => Category::all()]);
    }
}