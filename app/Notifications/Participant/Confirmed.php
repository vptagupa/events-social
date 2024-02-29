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
        $name = $this->workshop->name;
        $name = !empty($name) ? $name . ' ' : $this->workshop->participant->email . ' ';

        return(new MailMessage)
            ->subject('Confirmation of Your Event Registration')
            ->greeting('Dear ' . $name)
            ->line('We are delighted to confirm that your registration for the ' . $this->workshop->event->title . ' has been successfully received and processed. Your participation is now confirmed!')
            ->line('Here are the details of your registration:')
            ->line('Event Name: ' . $this->workshop->event->title)
            ->line('Date: ' . $this->workshop->event->expected_start_at->format('m/d/Y'))
            ->line('Time: ' . $this->event->expected_start_at->format('h:i a'))
            ->line('Place: ' . $this->workshop->event->place)
            ->line('Address: ' . $this->workshop->event->address)

            ->line("If you have any questions or require further assistance, please feel free to reach out to us.")
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
            //
        ];
    }
}
