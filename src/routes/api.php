<?php
use App\Http\Controllers\Api\V1\FrontEnd\ServiceProviderController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/services')->group(function () {
    Route::get('/', [ServiceProviderController::class, 'index']);
});
