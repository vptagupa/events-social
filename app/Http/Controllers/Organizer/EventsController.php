<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StoreEventRequest;
use App\Http\Requests\Event\UpdateEventRequest;
use App\Http\Resources\Event\EventResource;
use App\Http\Resources\SettingResource;
use App\Models\Event;
use App\Models\Organizer;
use App\Repositories\EventRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function __construct(private EventRepository $repository, private SettingRepository $settings)
    {
        // 
    }

    /**
     * Display the default page of the resource.
     */
    public function any()
    {
        return $this->render('organizer/events/index');
    }

    /**
     * Display the default page of the resource.
     */
    public function index(Organizer $organizer)
    {
        return $this->render('organizer/events/index', [
            'organizer' => $organizer
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function list(Request $request, Organizer $organizer)
    {
        return EventResource::collection(
            $this->repository->list(
                query: [
                    'title' => $request->get('query'),
                    'organizer' => true,
                    'organizer_id' => $organizer->id
                ],
                paginate: true,
                perPage: $request->get('per_page'),
            )
        );
    }

    /**
     * Display a listing of the resource.
     */
    public function anyList(Request $request)
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
     * Edit the specific resource
     */
    public function edit(Organizer $organizer, Event $event)
    {
        return $this->render('organizer/events/manage/edit/index', [
            'event' => $event->load('organizer')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request, Organizer $organizer)
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
    public function update(UpdateEventRequest $request, Organizer $organizer, Event $event)
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
     * Update the specified resource in storage.
     */
    public function offer(Request $request, Organizer $organizer, Event $event)
    {
        $request->validate(['offer_package' => 'required|boolean']);

        $this->repository->update($request->only([
            'offer_package',
        ]), $event->id);
    }


    /**
     * Activate the specified resource from storage
     */
    public function activate(Organizer $organizer, Event $event)
    {
        $this->repository->activate($event->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organizer $organizer, Event $event)
    {
        $this->repository->delete($event->id);
    }
}
