<?php

namespace App\Notifications\Participant;

use App\Models\Workshop;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Invitation extends Notification
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

        return (new MailMessage)
            ->subject($this->event->title . ' - Invitation.')
            ->line('You have been invited to participate for this coming event on '
                . $this->event->expected_start_at->format('F j, Y, h:i a ') . '.')
            ->line('Event: ' . $this->event->title)
            ->line('Place: ' . $this->event->place)
            ->line('Address: ' . $this->event->address)
            ->action('Accept Invite', url(route('invitation.accepted', $this->workshop->uuid)))
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
