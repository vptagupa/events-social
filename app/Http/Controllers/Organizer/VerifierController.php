<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Event;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Carbon\Carbon;

class VerifierController extends Controller
{
    public function index(Event $event)
    {
        return $this->render('organizer/verifier/index', [
            'event' => $event
        ]);
    }

    public function store(Request $request, Event $event, Workshop $workshop)
    {
        $request->user()->attendanceCreated()->save(new Attendance([
            'workshop_id' => $workshop->id
        ]));
    }

    public function verify(Request $request, Event $event, Workshop $workshop)
    {
        if ($event->id != $workshop->event_id) {
            throw new \Exception("Participant is not registered to this event!");
        }

        return $workshop->load([
            'event',
            'participant',
            'attendance' => function ($builder) {
                return $builder->whereDate('created_at', '=', Carbon::now()->format('Y-m-d'));
            }
        ])->append('statuses');
    }
}
