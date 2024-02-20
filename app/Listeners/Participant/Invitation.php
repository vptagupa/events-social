<?php

namespace App\Listeners\Participant;

use App\Models\Participant;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Events\NotificationSent;
use Illuminate\Queue\InteractsWithQueue;

class Invitation
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(NotificationSent $event): void
    {
        if ($event->notification instanceof \App\Notifications\Participant\Invitation) {
            $event->notification->workshop->notified_at = Carbon::now();
            $event->notification->workshop->save();
        }
    }
}
