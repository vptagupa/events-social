<?php

namespace App\Notifications\Organizer;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Workshop;

class Submission extends Notification
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
        $name = !empty($name) ? $name . ' ' : $this->workshop->participant->email . ' ';
        return (new MailMessage)
            ->subject($name . $this->event->title . ' - Submission.')
            ->line($name . 'has just submitted a registration.')
            ->action('View', url(route('participant.index', $this->workshop)))
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
