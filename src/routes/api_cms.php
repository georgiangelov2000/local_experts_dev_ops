<?php

use App\Http\Controllers\Api\V1\BackEnd\AuthController;


use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(callback: function () {
    
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});
