<?php
use App\Http\Controllers\Api\V1\FrontEnd\AuthController;
use App\Http\Controllers\Api\V1\FrontEnd\ServiceProviderController;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::get('services', [ServiceProviderController::class, 'index']);
    Route::get('services/{id}', [ServiceProviderController::class, 'show']);
    
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});
