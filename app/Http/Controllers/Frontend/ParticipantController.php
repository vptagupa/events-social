<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Workshop;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function index()
    {

    }

    /**
     * Show resource for acceptance
     */
    public function accepted(Workshop $workshop)
    {

    }

    /**
     * Show resource for registration
     */
    public function registration(Request $request, Workshop $workshop)
    {
        if (!$workshop->event->registrationForm->is_live) {
            return $this->render('frontend/registration/error', [
                'message' => 'The registration has not yet been activated. Please ask your organizer to assist you.'
            ]);
        }

        return $this->render('frontend/registration/index');
    }
}
