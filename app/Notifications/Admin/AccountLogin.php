<?php

namespace App\Notifications\Admin;

use App\Models\Admin;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AccountLogin extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(protected Admin $admin, protected string $password, protected bool $notifyPassword = false)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return(new MailMessage)
            ->subject('Welcome to ' . config('app.name') . ': Your Account Login Details!')
            ->greeting('Hi ' . $this->admin->name)
            ->line('Congratulations on joining us! Your login details have been generated. Log in now to start exploring our platform.')
            ->line("Role: " . str($this->admin->role->value)->ucfirst())
            ->line("Login Details: ")
            ->line("Email Address: " . $this->admin->email)
            ->lineIf($this->notifyPassword, "Password: " . $this->password)
            ->action('Login', url(route('admin.login.index')))
            ->line('Thank you!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
