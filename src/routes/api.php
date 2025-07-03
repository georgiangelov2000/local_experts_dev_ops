<?php
use App\Http\Controllers\Api\V1\FrontEnd\AuthController;
use App\Http\Controllers\Api\V1\FrontEnd\CategoryController;
use App\Http\Controllers\Api\V1\FrontEnd\ProfileController;
use App\Http\Controllers\Api\V1\FrontEnd\ServiceProviderController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:5,1');
    Route::post('refresh', [AuthController::class, 'refresh']);

    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        return response()->json(['message' => 'Email verified successfully.']);
    })->middleware(['signed'])->name('verification.verify');

    Route::post('/email/verification-notification', function (Request $request) {
        $user = auth()->user();
        $user->sendEmailVerificationNotification();
        return response()->json(['message' => 'Verification link sent!']);
    })->middleware(['throttle:6,1'])->name('verification.send');

    Route::get('services', [ServiceProviderController::class, 'index']);
    Route::get('services/{id}', [ServiceProviderController::class, 'show']);
    Route::post('services/reviews', [ServiceProviderController::class, 'createReview']);
    Route::put('services/reviews/{id}', [ServiceProviderController::class, 'updateReview']);
    Route::delete('services/reviews/{id}', [ServiceProviderController::class, 'deleteReview']);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category}/service-categories', [CategoryController::class, 'serviceCategories']);

    Route::middleware('auth:api')->group(function () {
        Route::put('profile', [ProfileController::class, 'profile']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});
