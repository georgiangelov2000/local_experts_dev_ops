<?php
use App\Http\Controllers\Api\V1\FrontEnd\AuthController;
use App\Http\Controllers\Api\V1\FrontEnd\CategoryController;
use App\Http\Controllers\Api\V1\FrontEnd\ProfileController;
use App\Http\Controllers\Api\V1\FrontEnd\ServiceProviderController;

use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::get('services', [ServiceProviderController::class, 'index']);
    Route::get('services/{id}', [ServiceProviderController::class, 'show']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category}/service-categories', [CategoryController::class, 'serviceCategories']);

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:5,1');
    Route::post('refresh', [AuthController::class, 'refresh']);

    Route::middleware('auth:api')->group(function () {
        Route::put('profile',[ProfileController::class,'profile']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});
