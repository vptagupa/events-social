<?php

namespace App\Models\Notifications;

use App\Notifications\Organizer\Submission;
use App\Models\Workshop;

trait OrganizerNotification
{
    public function notifySubmission(Workshop $workshop)
    {
        $this->notify(new Submission($workshop));
    }
}
