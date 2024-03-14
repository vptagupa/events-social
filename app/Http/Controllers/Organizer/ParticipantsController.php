<?php

namespace App\Http\Controllers\Organizer;

use App\Enums\RegistrationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Participant\InviteRequest;
use App\Http\Requests\Participant\ProofPaymentRequest;
use App\Http\Requests\Participant\StoreUserRequest;
use App\Http\Requests\Participant\UpdateUserRequest;
use App\Http\Resources\Participant\ParticipantResource;
use App\Models\Event;
use App\Models\Participant;
use App\Models\Workshop;
use App\Repositories\ParticipantRepository;
use App\Services\OfficialReceipt;
use Illuminate\Http\Request;


class ParticipantsController extends Controller
{
    public function __construct(private ParticipantRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Event $event)
    {
        return $this->render('organizer/events/manage/participants/index', [
            'event' => $event->load('registrationForm'),
            'registration_status' => RegistrationStatus::all()
        ]);
    }

    /**
     * Show list of resources
     */
    public function list(Request $request, Event $event)
    {

        $sort = $request->has('sort') ? $request->get('sort') : [['key' => 'id', 'asc' => false]];
        $sortQuery = array_filter($sort, fn($sort) => str($sort['key'])->contains('.'));
        $sortDirect = array_filter($sort, fn($sort) => !str($sort['key'])->contains('.'));

        return ParticipantResource::collection(
            $this->repository->list(
                query: [
                    'query' => is_array($request->get('query')) ? $request->get('query')['query'] : $request->get('query'),
                    'event_id' => $event->id,
                    'filter' => $request->get('query')['statuses'] ?? [],
                    'sort' => $sortQuery,
                    ...($request->has('with') ? $request->get('with') : [])
                ],
                orderBy: $sortDirect,
                paginate: true,
                perPage: $request->get('per_page'),
            )
        );
    }

    /**
     * Show the given resource
     */
    public function show(Event $event, Participant $participant)
    {
        return $this->render('organizer/events/manage/participants/index', [
            'participant' => $participant
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function invite(InviteRequest $request, Event $event)
    {
        $this->repository->sendInvitation($request->safe()->only([
            'email',
            'event_id',
            'registration_form_id'
        ]));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request, Event $event)
    {
        $this->repository->create($request->safe()->only([
            'name',
            'email',
            'event_id'
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, Event $event, Participant $participant)
    {
        $this->repository->update($request->safe()->only([
            'name',
            'email',
            'event_id'
        ]), $participant->id);
    }

    /**
     * Upload proof of payment
     */
    public function uploadProofOfPayment(ProofPaymentRequest $request, Event $event, Participant $participant)
    {
        if (config('system.include_tax')) {
            $request->merge([
                'tax' => config('system.tax')
            ]);
        }

        $this->repository->uploadProofOfPayment($request->only([
            'file',
            'price',
            'event_id',
            'tax'
        ]), $participant->id);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event, Participant $participant)
    {
        $this->repository->delete($participant->id);
    }

    /**
     * Update Order No#
     */
    public function officialReceipt(Request $request, Event $event, Workshop $workshop)
    {
        $pdf = OfficialReceipt::make($workshop->id, $workshop->event->id);

        return $pdf->stream();
    }
}
