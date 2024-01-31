<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\RegistrationForm;
use Illuminate\Http\Request;
use App\Repositories\EventRepository;

class RegistrationFormController extends Controller
{

    public function __construct(private EventRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Event $event)
    {
        return $this->render('organizer/events/manage/registration-form/index', [
            'event' => $event->load('registrationForm')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Event $event)
    {
        if (!$event->registrationForm) {
            $request->validate([
                'schema' => 'required'
            ]);
            $event->registrationForm()->save(new RegistrationForm($request->only('schema')));
            return;
        }

        $this->update($request, $event);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $request->validate([
            'schema' => 'required'
        ]);

        $event->registrationForm->schema = $request->schema;
        $event->registrationForm->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->registrationForm->delete();
    }
}
