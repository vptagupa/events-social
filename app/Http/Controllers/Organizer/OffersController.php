<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StorePricingRequest;
use App\Models\Event;
use App\Models\Offer;
use App\Repositories\EventRepository;
use App\Services\Payment;
use Illuminate\Http\Request;

use App\Repositories\SystemFeeRepository;

class OffersController extends Controller
{
    public function __construct(private SystemFeeRepository $systemFee, private EventRepository $event)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Event $event)
    {
        return $this->render('organizer/events/manage/pricing/index', [
            'event' => $event->load('offers'),
            'payment' => Payment::calculate($event->id, 0)
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePricingRequest $request, Event $event)
    {
        \Log::info($request->get('offers'));
        $this->event->saveOffers($event->id, $request->only([
            'price'
        ]), $request->get('offers'));
    }

    /**
     * Calculate total payments and return the details breadown
     */
    public function payment(Request $request, Event $event)
    {
        return Payment::calculate($event->id, $request->get('price'), config('payment.tax'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offer $package)
    {
        $package->delete();
    }
}
