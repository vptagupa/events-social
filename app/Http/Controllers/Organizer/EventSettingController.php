<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingResource;
use App\Models\Event;
use App\Models\Setting;
use App\Repositories\SettingRepository;
use Illuminate\Http\Request;

class EventSettingController extends Controller
{
    public function __construct(private SettingRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function list(Request $request, Event $event)
    {
        return SettingResource::collection(
            $this->repository->list(
                paginate: true,
                perPage: 5,
                query: [
                    'event_id' => $event->id
                ]
            )
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event, Setting $setting)
    {
        $request->validate([
            'checked' => 'required|boolean'
        ]);

        $this->repository->updateEvent($event, $setting->id, $request->get('checked'));
    }
}
