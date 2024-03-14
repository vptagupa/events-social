<?php

namespace App\Http\Controllers\Organizer;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StoreEventRequest;
use App\Http\Requests\Event\UpdateEventRequest;
use App\Http\Resources\Event\EventResource;
use App\Http\Resources\ExportResource;
use App\Http\Resources\SettingResource;
use App\Models\Event;
use App\Models\Organizer;
use App\Repositories\EventRepository;
use App\Repositories\ExportRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;

class EventsController extends Controller
{
    public function __construct(
        private EventRepository $repository,
        private SettingRepository $settings,
        private ExportRepository $export
    ) {

    }

    /**
     * Display the default page of the resource.
     */
    public function any(Request $request)
    {
        if ($request->user()->typeIs(UserType::ORGANIZER)) {
            return $this->index($request->user());
        }

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
     * Show the specific resource
     */
    public function settings(Organizer $organizer, Event $event)
    {
        return $this->render('organizer/events/manage/settings/index', [
            'event' => $event->load('officialReceiptSignature')
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
            'place',
            'address',
            'map',
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
            'place',
            'address',
            'map',
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

    /**
     * Export participants records
     */
    public function export(Request $request, Event $event)
    {
        $request->validate([
            'type' => 'required',
            'filter' => 'required',
            'filter.*.name' => 'required',
        ]);

        $request->merge(['event_id' => $event->id]);

        $export = $this->repository->export($request->get('type'), $request->only(['filter', 'event_id']));

        return $export->url;
    }

    /**
     * Update the specified resource in storage.
     */
    public function exportList(Request $request, Event $event)
    {
        return ExportResource::collection(
            $this->export->list(
                query: [
                    'exportable_id' => $event->id,
                    'exportable_type' => Event::class,
                ],
                paginate: true,
                perPage: 5,
                orderBy: ['id', 'desc']
            )
        );
    }

    /**
     * Get event statistics such as total number of confirmed, registered and etc
     */
    public function statistics(Event $event)
    {
        return $this->repository->statistics($event->id);
    }

    public function updateOfficialReceiptSettings(Request $request, Event $event)
    {
        $request->validate([
            'official_receipt_signatory' => 'nullable',
            'signature' => Rule::when($request->signature instanceof UploadedFile, \App\Rules\Image::ensure())
        ]);

        $this->repository->updateOfficialReceipt($request->only([
            'signature',
            'official_receipt_signatory'
        ]), $event->id);
    }
}
