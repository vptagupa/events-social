<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Repositories\EventRepository;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function __construct(private EventRepository $repository)
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
}
