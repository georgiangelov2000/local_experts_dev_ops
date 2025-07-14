<?php
use App\Http\Controllers\Api\V1\FrontEnd\AuthController;
use App\Http\Controllers\Api\V1\FrontEnd\CategoryController;
use App\Http\Controllers\Api\V1\FrontEnd\ProfileController;
use App\Http\Controllers\Api\V1\FrontEnd\ServiceProviderController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::middleware('throttle:60,1')->group(function () {
        Route::post('register', [AuthController::class, 'register'])->middleware('throttle:5,1');
        Route::post('login', [AuthController::class, 'login'])->middleware('throttle:5,1');
        Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:5,1');
        Route::post('reset-password', [AuthController::class, 'resetPassword']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('/auth/{provider}/redirect', [AuthController::class, 'redirectToProvider']);
        Route::get('/auth/{provider}/callback', [AuthController::class, 'handleProviderCallback']);

        Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
            $request->fulfill();
            return response()->json(['message' => 'Email verified successfully.']);
        })->middleware(['signed'])->name('verification.verify');

        Route::post('/email/verification-notification', function (Request $request) {
            $user = auth()->user();
            $user->sendEmailVerificationNotification();
            return response()->json(['message' => 'Verification link sent!']);
        })->middleware(['throttle:6,1'])->name('verification.send');

        Route::post('/providers/bulk', [ServiceProviderController::class, 'getProvidersByIds']);
        Route::get('services', [ServiceProviderController::class, 'index']);
        Route::get('services/{alias}/{page}', [ServiceProviderController::class, 'show']);
        Route::post('services/{alias}/views', [ServiceProviderController::class, 'incrementViews']);
        
        Route::get('/categories', [CategoryController::class, 'index']);
        Route::get('/categories/{category}/service-categories', [CategoryController::class, 'serviceCategories']);
    });

    Route::middleware('auth:api')->group(function () {
        Route::post('providers/{provider}/like', [ServiceProviderController::class, 'like']);
        Route::post('providers/{provider}/dislike', [ServiceProviderController::class, 'dislike']);
        
        Route::post('services/favourites', [ServiceProviderController::class, 'createFavourites']);
        Route::delete('services/favourites/{providerId}', [ServiceProviderController::class, 'removeFavourites']);        
        
        Route::post('services/reviews', [ServiceProviderController::class, 'createReview']);
        Route::put('services/reviews/{id}', [ServiceProviderController::class, 'updateReview']);
        Route::delete('services/reviews/{id}', [ServiceProviderController::class, 'deleteReview']);    
        
        Route::post('profile', [ProfileController::class, 'profile']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
        Route::post('change-password', [AuthController::class, 'changePassword']);

        // Single tab-specific profile route
        Route::get('profile/tab/{tab}', [ProfileController::class, 'tabData']);
        Route::get('profile/preview', [ProfileController::class, 'preview']);
    });
});
