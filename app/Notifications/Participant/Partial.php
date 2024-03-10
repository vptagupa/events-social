<?php

namespace App\Notifications\Participant;

use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Workshop;

class Partial extends Notification
{
    use Queueable;

    public $event;

    /**
     * Create a new notification instance.
     */
    public function __construct(protected Workshop $workshop, protected Transaction $transaction)
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

        $message = (new MailMessage)
            ->subject('Partial payment of Your Event Registration')
            ->greeting(empty($name) ? 'Hello' : 'Dear ' . $name)
            ->line('We would like you to inform that your partial payment for the ' . $this->workshop->event->title . ' has been successfully received. Please pay for the remaining balance to confirm your registration.')
            ->line('Details of your payment:')
            ->line('Total Payment Received: ' . number_format($this->workshop->paid, 2))
            ->line('Remaining Balance: ' . number_format($this->workshop->balance, 2))
            ->line('Payment Remarks: ' . $this->transaction->remarks)
            ->line('')
            ->line('Details of your event:')
            ->line('Event Name: ' . $this->workshop->event->title)
            ->line('Date: ' . $this->workshop->event->expected_start_at->format('m/d/Y'))
            ->line('Time: ' . $this->event->expected_start_at->format('h:i a'))
            ->line('Place: ' . $this->workshop->event->place)
            ->line('Address: ' . $this->workshop->event->address)


            ->line("If you have any questions or require further assistance, please feel free to reach out to us.")
            ->line('We look forward to seeing you at the event!');

        if ($this->transaction->officialReceipt) {
            $message->attach(storage_path('app/' . $this->transaction->officialReceipt->path), [
                'as' => 'receipt.' . $this->transaction->officialReceipt->ext
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
