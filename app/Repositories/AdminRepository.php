<?php

namespace App\Repositories;

use App\Enums\Role;
use App\Models\Admin;

class AdminRepository extends Repository
{

    public function __construct(protected Admin $model)
    {
        // 
    }

    public function create(array $data, $notifyPassword = false): ?Admin
    {
        $password = $data['password'] ?? null;
        if (!isset($data['password'])) {
            $notifyPassword = true;
            $data['password'] = bcrypt($password = config('auth.password_default'));
        }

        \DB::transaction(function () use ($data, $password, $notifyPassword) {
            $model = parent::create($data);

            $model->notifyAccountLogin($password, $notifyPassword);
        });

        return null;
    }

    public function delete($id)
    {
        if ($this->model()->where('role', Role::ADMIN)->count() > 1) {
            return parent::delete($id);
        }

        throw new \Exception("Could not delete the remaining account.");
    }

    public function activate($id)
    {
        $model = $this->find($id);

        if ($model->active && $this->model()->count() == 1) {
            throw new \Exception("Could not de-activate the remaining account.");
        }

        $this->update([
            'active' => !$model->active
        ], $id);
    }
}