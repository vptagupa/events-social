<?php

namespace App\Notifications\Participant;

use App\Models\Workshop;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TrackingLink extends Notification
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
            ->subject($this->event->title . ' - Tracking Link.')
            ->line('Thank you for participating for this coming event on '
                . $this->event->expected_start_at->format('F j, Y, h:i a ') . '.')
            ->line('Event: ' . $this->event->title)
            ->line('Place: ' . $this->event->place)
            ->line('Address: ' . $this->event->address)
            ->line('To continue editing or checking the status of your application, please use the link below.')
            ->action('Continue', url(route('registration.index', $this->workshop->uuid)))
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

        ];
    }
}
