<?php

namespace App\Http\Controllers\Admin\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\StoreOrganizerRequest;
use App\Http\Requests\Organizer\UpdateOrganizerRequest;
use App\Http\Resources\Organizer\OrganizerResource;
use App\Models\Organizer;
use Illuminate\Http\Request;
use App\Repositories\OrganizerRepository;

class OrganizersController extends Controller
{
    public function __construct(private OrganizerRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/backend/organizers/index');
    }

    public function list(Request $request)
    {
        return OrganizerResource::collection(
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
    public function store(StoreOrganizerRequest $request)
    {
        $this->repository->create($request->safe()->only([
            'name',
            'email',
            'password'
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrganizerRequest $request, Organizer $organizer)
    {
        $this->repository->update($request->safe()->only([
            'name',
            'email',
        ]), $organizer->id);
    }

    /**
     * Reset user password
     */
    public function resetPassword(Organizer $organizer)
    {
        $this->repository->update([
            'password' => bcrypt(config('auth.default_password'))
        ], $organizer->id);
    }

    /**
     * Activate user
     */
    public function activate(Organizer $organizer)
    {
        $this->repository->activate($organizer->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organizer $organizer)
    {
        $this->repository->delete($organizer->id);
    }
}
