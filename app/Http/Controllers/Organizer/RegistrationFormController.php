<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StoreRegistrationForm;
use App\Models\Event;
use App\Models\RegistrationForm;
use Carbon\Carbon;
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
    public function store(StoreRegistrationForm $request, Event $event)
    {
        $now = Carbon::now();

        if ($request->has('published')) {
            $event->published_at = $request->published == true ? $now : null;
        }

        if (!$event->registrationForm) {
            $event->registrationForm()->save(new RegistrationForm($request->only(['schema'])));

            $event->save();

            return;
        }

        $this->update($request, $event);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRegistrationForm $request, Event $event)
    {
        $now = Carbon::now();
        $event->registrationForm->schema = $request->schema;
        $event->registrationForm->save();

        $event->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->registrationForm->delete();
    }
}
