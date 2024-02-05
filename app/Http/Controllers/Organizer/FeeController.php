<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Fee\FeeResource;
use App\Models\Event;
use App\Models\Fee;
use App\Models\OrganizerFee;
use App\Repositories\OrganizerFeeRepository;
use Illuminate\Http\Request;

class FeeController extends Controller
{
    public function __construct(private OrganizerFeeRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function list(Request $request, Event $event)
    {
        return FeeResource::collection(
            $this->repository->list(
                paginate: true,
                perPage: 3,
                query: [
                    'event_id' => $event->id,
                    'active' => 1
                ]
            )
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event, OrganizerFee $fee)
    {
        $request->validate([
            'checked' => 'required|boolean'
        ]);

        $this->repository->updateEvent($event, $fee->id, $request->get('checked'));
    }
}
