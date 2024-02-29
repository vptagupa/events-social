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
        $name = $this->workshop->name;
        $name = !empty($name) ? $name . ' ' : $this->workshop->participant->email . ' ';

        return(new MailMessage)
            ->subject('Invitation to Join ' . $this->event->title)
            ->greeting('Dear ' . $name)
            ->line('We are excited to invite you to join us for ' . $this->workshop->event->title . '! As a valued member of our community, we would be delighted to have you participate in this event.')
            ->line('Event Details:')
            ->line('Date: ' . $this->workshop->event->expected_start_at->format('m/d/Y'))
            ->line('Time: ' . $this->event->expected_start_at->format('h:i a'))
            ->line('Place: ' . $this->workshop->event->place)
            ->line('Address: ' . $this->workshop->event->address)
            ->action('Accept Invite', url(route('invitation.accepted', $this->workshop->uuid)))
            ->line("If you have any questions or need further information, feel free to contact us.")
            ->line('We look forward to seeing you at the event!');
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
