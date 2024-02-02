<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Fee\StoreOrganizerFeeRequest;
use App\Http\Requests\Fee\UpdateOrganizerFeeRequest;
use App\Http\Resources\Fee\FeeResource;
use App\Models\Organizer;
use App\Models\OrganizerFee;
use App\Repositories\OrganizerFeeRepository;
use Illuminate\Http\Request;

class FeesController extends Controller
{
    public function __construct(private OrganizerFeeRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function any()
    {
        return $this->render('organizer/fees/index');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Organizer $organizer)
    {
        return $this->render('organizer/fees/index', [
            'organizer' => $organizer
        ]);
    }

    public function list(Request $request, Organizer $organizer)
    {
        return FeeResource::collection(
            $this->repository->list(
                query: [
                    'name' => $request->get('query'),
                    'organizer' => true,
                    'organizer_id' => $organizer->id
                ],
                paginate: true,
                perPage: $request->get('per_page'),
            )
        );
    }

    public function anyList(Request $request)
    {
        return FeeResource::collection(
            $this->repository->list(
                query: [
                    'name' => $request->get('query'),
                    'organizer' => true,
                ],
                paginate: true,
                perPage: $request->get('per_page'),
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrganizerFeeRequest $request, Organizer $organizer)
    {
        $request->merge(['organizer_id' => $organizer->id]);
        $this->repository->create($request->safe()->only([
            'organizer_id',
            'name',
            'price',
            'active'
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrganizerFeeRequest $request, Organizer $organizer, OrganizerFee $fee)
    {
        $request->merge(['organizer_id' => $organizer->id]);
        $this->repository->update($request->safe()->only([
            'organizer_id',
            'name',
            'price',
            'active'
        ]), $fee->id);
    }

    /**
     * Activate user
     */
    public function activate(Organizer $organizer, OrganizerFee $fee)
    {
        $this->repository->activate($fee->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organizer $organizer, OrganizerFee $fee)
    {
        $this->repository->delete($fee->id);
    }
}
