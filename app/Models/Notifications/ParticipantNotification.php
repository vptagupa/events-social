<?php

namespace App\Models\Notifications;

use Carbon\Carbon;
use App\Models\Workshop;
use App\Notifications\Participant\{Invitation, TrackingLink};

trait ParticipantNotification
{
    public function sendInvitation(Workshop $workshop)
    {
        return $this->notify(new Invitation($workshop));
    }

    public function sendTrackingLink(Workshop $workshop)
    {
        $this->notify(new TrackingLink($workshop));
        $workshop->notified_at = Carbon::now();
        $workshop->save();
    }
}
