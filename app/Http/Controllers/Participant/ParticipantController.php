<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Participant\RegisterRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Workshop;
use App\Repositories\ParticipantRepository;
use App\Repositories\TransactionRepository;
use App\Services\RegistrationForm;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function __construct(private ParticipantRepository $repository, private TransactionRepository $transaction)
    {

    }

    /**
     * Display the default page of the resource.
     */
    public function index(Workshop $workshop)
    {
        return $this->render('participant/registration/index', [
            'workshop' => $workshop->load([
                'participant',
                'event'
            ])
        ]);
    }

    /**
     * View Submitted Registration forms
     */
    public function registrationForm(Workshop $workshop)
    {
        return RegistrationForm::populate(
            $workshop->participant_id,
            $workshop->event_id,
        );
    }

    /**
     * Cancelled participant workshop
     */
    public function cancelled(Workshop $workshop)
    {
        $workshop->cancelled_at = Carbon::now();
        $workshop->notifyCancelled();
        $workshop->save();
    }

    /**
     * Confirmed participant workshop
     */
    public function confirmed(Workshop $workshop)
    {
        $workshop->confirmed_at = Carbon::now();
        $workshop->notifyConfirmed();
        $workshop->save();
    }

    /**
     * Show participant transactions
     */
    public function transactions(Workshop $workshop)
    {
        return TransactionResource::collection(
            $this->transaction->list(
                paginate: true,
                perPage: 2,
                query: [
                    'workshop_id' => $workshop->id,
                    'file' => true,
                    'workshop.participant' => true
                ],
                orderBy: ['id', 'desc']
            )
        );
    }

    /**
     * Store registration
     */
    public function update(RegisterRequest $request, Workshop $workshop)
    {
        $request->merge(['note' => $request->get('note')]);
        $request->validate(['note' => 'max:250']);

        $this->repository->registerUpdate($request->only('flexis', 'event_id', 'note'), $workshop->participant->id);
    }
}
