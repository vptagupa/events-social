<?php

namespace App\Repositories;

use App\Models\Admin;

class AdminRepository extends Repository
{

    public function __construct(Admin $model)
    {
        $this->model = $model;
    }

    public function create(array $data)
    {
        if (!isset($data['password'])) {
            $data['password'] = bcrypt(config('auth.password_default'));
        }

        parent::create($data);
    }
}