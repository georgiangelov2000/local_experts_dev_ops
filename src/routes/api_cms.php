<?php

use App\Http\Controllers\Api\V1\BackEnd\AuthController;
use App\Http\Controllers\Api\V1\BackEnd\CategoryController;
use App\Http\Controllers\Api\V1\BackEnd\ServiceCategoryController;
use App\Http\Controllers\Api\V1\BackEnd\ServiceProviderController;
use App\Http\Controllers\Api\V1\BackEnd\WorkSpaceController;

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('register', [AuthController::class, 'register'])->name('register');

    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('me', [AuthController::class, 'me'])->name('me');
        Route::get('providers', [ServiceProviderController::class, 'index'])->name('providers.index');


        Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');
        Route::get('workspaces', [WorkSpaceController::class, 'index'])->name('workspaces.index');
        Route::get('categories/{category}/service-categories', [CategoryController::class, 'serviceCategory'])->name('service.categories.index');
    });
});
