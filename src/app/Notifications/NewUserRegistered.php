<?php
// app/Notifications/NewUserRegistered.php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;

class NewUserRegistered extends Notification
{
    use Queueable;

    protected User $newUser;

    /**
     * Create a new notification instance.
     *
     * @param User $newUser
     */
    public function __construct(User $newUser)
    {
        $this->newUser = $newUser;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array<string>
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        $type = ($this->newUser->role_id === User::SERVICE_PROVIDER) ? 'Service Provider' : 'User';

        return (new MailMessage)
            ->subject('New User Registration')
            ->greeting('Hello Administrator,')
            ->line("A new {$type} has registered on the platform.")
            ->line('Email: ' . $this->newUser->email)
            ->line('Registered At: ' . $this->newUser->created_at->toDateTimeString())
            ->action('View User', url('/admin/users/' . $this->newUser->id)) // adjust URL to your admin panel
            ->line('Thank you for using our application!');
    }
}
