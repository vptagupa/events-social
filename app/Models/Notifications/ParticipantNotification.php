<?php

namespace App\Models\Notifications;

use App\Models\Workshop;
use App\Notifications\Participant\Invitation;

trait ParticipantNotification
{
    public function sendInvitation(Workshop $workshop)
    {
        return $this->notify(new Invitation($workshop));
    }
}
