<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Participant\JoinRequest;
use App\Models\Event;
use App\Models\Workshop;
use App\Repositories\EventRepository;
use App\Repositories\ParticipantRepository;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function __construct(private EventRepository $repository, private ParticipantRepository $participant)
    {

    }

    /**
     * Show event resource
     */
    public function index(Event $event)
    {
        return $this->render('frontend/event/index', [
            'event' => $event
        ]);
    }

    /**
     * Join participant
     */
    public function join(JoinRequest $request, Event $event)
    {
        $model = $this->participant->join($request->only(['event_id', 'email']));

        return redirect(route('registration.index', $model->currentWorkshop($event->id)));
    }
}
