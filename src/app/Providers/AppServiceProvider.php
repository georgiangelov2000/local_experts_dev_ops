<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use App\Repositories\ServiceProviderRepository;
use App\Repositories\ReviewRepository;
use App\Services\ServiceProviderService;
use App\Services\ReviewService;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register repositories
        $this->app->singleton(ServiceProviderRepository::class);
        $this->app->singleton(ReviewRepository::class);

        // Register services
        $this->app->singleton(ServiceProviderService::class);
        $this->app->singleton(ReviewService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::prefix('api')->middleware('api')->group(base_path('routes/api.php'));
        
        ResetPassword::toMailUsing(function ($notifiable, $token) {
        $url = url(config('app.url') . "/reset-password?token=$token&email=" . urlencode($notifiable->email));

        return (new MailMessage)
                ->subject('Reset your password')
                ->view('emails.password_reset', ['url' => $url]);
        });
    }
}
