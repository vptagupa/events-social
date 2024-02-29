<?php

namespace App\Http\Controllers\Admin\Backend;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use App\Repositories\AdminRepository;
use App\Enums\Role;
use App\Http\Resources\User\UserResource;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;

class UsersController extends Controller
{
    public function __construct(private AdminRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/backend/users/index', [
            'roles' => Role::all()
        ]);
    }

    public function list(Request $request)
    {
        return UserResource::collection(
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
    public function store(StoreUserRequest $request)
    {
        $this->repository->create($request->safe()->only([
            'name',
            'nickname',
            'email',
            'role',
            'password'
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, Admin $admin)
    {
        $this->repository->update($request->safe()->only([
            'name',
            'nickname',
            'email',
            'role',
        ]), $admin->id);
    }

    /**
     * Reset user password
     */
    public function resetPassword(Admin $admin)
    {
        $this->repository->update([
            'password' => bcrypt(config('auth.password_default'))
        ], $admin->id);
    }

    /**
     * Activate user
     */
    public function activate(Admin $admin)
    {
        $this->repository->activate($admin->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        $this->repository->delete($admin->id);
    }
}
