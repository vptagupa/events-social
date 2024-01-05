<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends Repository
{
    public function __construct(User $model)
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