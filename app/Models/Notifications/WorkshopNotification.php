<?php

namespace App\Models\Notifications;

use App\Models\Transaction;
use App\Notifications\Participant\{
    Cancelled,
    Confirmed,
    Invitation,
    TrackingLink,
    Certificate
};
use App\Models\Certificate as Cert;
use App\Notifications\Participant\Partial;
use App\Notifications\Participant\Payment;
use Carbon\Carbon;
use Illuminate\Support\Facades\Notification;

trait WorkshopNotification
{
    public function notifyConfirmed(?Transaction $transaction = null)
    {
        Notification::route('mail', [
            $this->participant->email
        ])->notify(new Confirmed($this, $transaction));
    }

    public function notifyPartial(Transaction $transaction)
    {
        Notification::route('mail', [
            $this->participant->email
        ])->notify(new Partial($this, $transaction));
    }

    public function notifyCancelled()
    {
        Notification::route('mail', [
            $this->participant->email
        ])->notify(new Cancelled($this));
    }

    public function sendInvitation()
    {
        Notification::route('mail', [
            $this->participant->email
        ])->notify(new Invitation($this));
    }

    public function sendTrackingLink()
    {
        Notification::route('mail', [
            $this->participant->email
        ])->notify(new TrackingLink($this));

        $this->notified_at = Carbon::now();
        $this->save();
    }

    public function sendCertificate(Cert $certificate)
    {
        Notification::route('mail', [
            $this->participant->email
        ])->notify(new Certificate($this, $certificate));
    }

    public function sendPaymentForm()
    {
        Notification::route('mail', [
            $this->participant->email
        ])->notify(new Payment($this));
    }
}