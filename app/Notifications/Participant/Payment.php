<?php

namespace App\Notifications\Participant;

use App\Models\Workshop;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Payment extends Notification
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
        return(new MailMessage)
            ->subject($this->event->title . ' for Payment.')
            ->line('Thank you for participating for this coming event on '
                . $this->event->expected_start_at->format('F j, Y, h:i a ') . '.')
            ->line('Event: ' . $this->event->title)
            ->line('Place: ' . $this->event->place)
            ->line('Address: ' . $this->event->address)
            ->line('To proceed to the payment form, kindly utilize the link provided below.')
            ->action('Payment', url(route('registration.pay', $this->workshop->uuid)));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [

        ];
    }
}
