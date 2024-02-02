<?php

namespace App\Repositories;

use App\Models\Organizer;

class OrganizerRepository extends Repository
{

    public function __construct(protected Organizer $model)
    {
        // 
    }

    public function create(array $data)
    {
        if (!isset($data['password'])) {
            $data['password'] = bcrypt(config('auth.password_default'));
        }

        parent::create($data);
    }

    public function activate($id)
    {
        $model = $this->find($id);

        $this->update([
            'active' => !$model->active
        ], $id);
    }
}