<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StoreEventRequest;
use App\Http\Requests\Event\UpdateEventRequest;
use App\Http\Resources\Event\EventResource;
use App\Models\Event;
use App\Repositories\EventRepository;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function __construct(private EventRepository $repository)
    {
        // 
    }

    /**
     * Display the default page of the resource.
     */
    public function index()
    {
        return $this->render('organizer/events/index');
    }

    /**
     * Display a listing of the resource.
     */
    public function list(Request $request)
    {
        return EventResource::collection(
            $this->repository->list(
                query: [
                    'title' => $request->get('query'),
                    'organizer' => true,
                ],
                paginate: true,
                perPage: $request->get('per_page'),
            )
        );
    }

    /**
     * Display the manage page of the resource.
     */
    public function show(Event $event)
    {
        return $this->render('organizer/events/manage/index', [
            'event' => $event
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $this->repository->create($request->only([
            'organizer_id',
            'slug',
            'title',
            'description',
            'expected_start_at',
            'expected_end_at'
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $this->repository->update($request->only([
            'organizer_id',
            'slug',
            'title',
            'description',
            'expected_start_at',
            'expected_end_at'
        ]), $event->id);
    }


    /**
     * Activate the specified resource from storage
     */
    public function activate(Event $event)
    {
        $this->repository->activate($event->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $this->repository->delete($event->id);
    }
}
