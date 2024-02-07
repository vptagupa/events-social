<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Participant\InviteRequest;
use App\Http\Requests\Participant\ProofPaymentRequest;
use App\Http\Requests\Participant\StoreUserRequest;
use App\Http\Requests\Participant\UpdateUserRequest;
use App\Http\Resources\Participant\ParticipantResource;
use App\Models\Event;
use App\Models\Participant;
use App\Repositories\ParticipantRepository;
use App\Rules\ImageFile;
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
            'event' => $event
        ]);
    }

    /**
     * Show list of resources
     */
    public function list(Request $request, Event $event)
    {
        return ParticipantResource::collection(
            $this->repository->list(
                query: [
                    'query' => $request->get('query'),
                    'event_id' => $event->id
                ],
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
}
