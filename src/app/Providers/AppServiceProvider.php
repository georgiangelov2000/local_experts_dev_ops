<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Регистрираме рутите
        Route::prefix('api')->middleware('api')->group(base_path('routes/api.php'));

        // Персонализираме имейла за забравена парола
        ResetPassword::toMailUsing(function ($notifiable, $token) {
            $url = url(config('app.url') . "/reset-password?token=$token&email=" . urlencode($notifiable->email));

            return (new MailMessage)
                ->subject('Reset your password')
                ->view('emails.password_reset', ['url' => $url]);
        });
    }
}
