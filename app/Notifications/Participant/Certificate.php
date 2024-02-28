<?php

namespace App\Notifications\Participant;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Workshop;
use App\Models\Certificate as Cert;

class Certificate extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Workshop $workshop, public Cert $certificate)
    {

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
        return(new MailMessage)->subject('Your Event Attendance Certificate is Ready for Download!')
            ->markdown('mail.certificate', [
                'name' => $this->workshop->name,
                'event' => $this->workshop->event->title
            ])
            ->attach(storage_path('app/' . $this->certificate->file->path));
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
