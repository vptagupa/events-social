<?php

namespace App\Notifications\Participant;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Workshop;

class Confirmed extends Notification
{
    use Queueable;

    public $event;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Workshop $workshop)
    {
        $this->event = $this->workshop->event;
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
        $name = $this->workshop->primary_name;
        $salutation = $this->workshop->salutation;
        $name = !empty($name) ? $name . ' ' : $this->workshop->participant->email . ' ';

        return (new MailMessage)
            ->subject('Your Registration is Confirmed!')
            ->greeting('Hello!')
            ->line((empty($salutation) ? '' : $salutation . ' ') . $name . 'your registration has been successfully confirmed.')
            ->line('See you!');
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
