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
        $message = (new MailMessage)->subject('Your Event Attendance Certificate is Ready for Download!')
            ->greeting("Hello " . $this->workshop->name)
            ->line("We are pleased to inform you that your attendance certificate for the " . $this->workshop->event->title . " is now available for download.")
            ->line("Please find the attached file to access your certificate.")
            ->line("If you have any questions or encounter any issues while downloading your certificate, please don't hesitate to reach out to us. We're here to assist you.");

        if ($this->certificate->file) {
            $message->attach(storage_path('app/' . $this->certificate->file->path), [
                'as' => 'certificate.' . $this->certificate->file->ext
            ]);
        } elseif (!$this->certificate->file) {
            $message->attachData((string) \App\Services\Certificate::produce($this->certificate->name), 'certificate.jpeg', [
                'mime' => 'image/jpeg'
            ]);
        }

        return $message;
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
