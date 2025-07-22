<?php

use App\Http\Controllers\Api\V1\BackEnd\AuthController;
use App\Http\Controllers\Api\V1\BackEnd\CategoryController;
use App\Http\Controllers\Api\V1\BackEnd\ServiceCategoryController;
use App\Http\Controllers\Api\V1\BackEnd\ServiceProviderController;
use App\Http\Controllers\Api\V1\BackEnd\CityController;

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('register', [AuthController::class, 'register'])->name('register');

    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('me', [AuthController::class, 'me'])->name('me');
        Route::get('providers', [ServiceProviderController::class, 'index'])->name('providers.index');
        Route::delete('providers/{provider}', [ServiceProviderController::class, 'destroy'])->name('providers.destroy');


        Route::get('categories', [CategoryController::class, 'index']);
        Route::post('categories', [CategoryController::class, 'store']);
        Route::get('categories/{id}/service-categories', [CategoryController::class, 'serviceCategory']);
        Route::put('categories/{id}', [CategoryController::class, 'update']);
        Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

        Route::get('cities', [CityController::class, 'index']);     // GET all cities
        Route::post('cities', [CityController::class, 'store']);    // POST create city
        Route::get('cities/{id}', [CityController::class, 'show']); // GET single city
        Route::put('cities/{id}', [CityController::class, 'update']); // PUT update city
        Route::delete('cities/{id}', [CityController::class, 'destroy']); // DELETE city

        Route::get('categories/{category}/service-categories', [CategoryController::class, 'serviceCategory'])->name('service.categories.index');
    });
});
