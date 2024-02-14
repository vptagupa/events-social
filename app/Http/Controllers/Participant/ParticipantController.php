<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\Workshop;
use App\Repositories\ParticipantRepository;
use App\Services\RegistrationForm;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function __construct(ParticipantRepository $repository)
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
                'event',
                'transactions'
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
}
