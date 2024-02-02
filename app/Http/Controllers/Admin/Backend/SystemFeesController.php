<?php

namespace App\Http\Controllers\Admin\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Fee\StoreSystemFeeRequest;
use App\Http\Requests\Fee\UpdateSystemFeeRequest;
use App\Http\Resources\Event\FeeResource;
use App\Models\SystemFee;
use App\Repositories\SystemFeeRepository;
use Illuminate\Http\Request;

class SystemFeesController extends Controller
{
    public function __construct(private SystemFeeRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/backend/setup/fees/index');
    }

    public function list(Request $request)
    {
        return FeeResource::collection(
            $this->repository->list(
                query: [
                    'name' => $request->get('query'),
                    ...$request->get('extra')['where'] ?? [],
                    ...$request->get('extra')['with'] ?? []
                ],
                paginate: true,
                perPage: $request->get('per_page'),
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSystemFeeRequest $request)
    {
        $this->repository->create($request->safe()->only([
            'name',
            'price',
            'active'
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSystemFeeRequest $request, SystemFee $fee)
    {
        $this->repository->update($request->safe()->only([
            'name',
            'price',
            'active'
        ]), $fee->id);
    }

    /**
     * Activate user
     */
    public function activate(SystemFee $fee)
    {
        $this->repository->activate($fee->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SystemFee $fee)
    {
        $this->repository->delete($fee->id);
    }
}
