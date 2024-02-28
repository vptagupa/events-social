<?php

namespace App\Models\Notifications;

use App\Notifications\Participant\{
    Cancelled,
    Confirmed,
    Invitation,
    TrackingLink,
    Certificate
};
use App\Models\Certificate as Cert;
use Carbon\Carbon;
use Illuminate\Support\Facades\Notification;

trait WorkshopNotification
{
    public function notifyConfirmed()
    {
        Notification::route('mail', [
            $this->participant->email
        ])->notify(new Confirmed($this));
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
}