<?php

namespace App\Repositories;

use Illuminate\Support\Str;
use App\Models\Organizer;


class OrganizerRepository extends Repository
{

    public function __construct(protected Organizer $model)
    {
        // 
    }

    public function create(array $data): ?Organizer
    {
        $password = $data['password'] ?? null;
        if (!isset($data['password'])) {
            $data['password'] = bcrypt($password = Str::random(6));
        }

        \DB::transaction(function () use ($data, $password) {
            $model = parent::create($data);

            $model->notifyAccountLogin($password);
        });

        return null;
    }

    public function activate($id)
    {
        $model = $this->find($id);

        $this->update([
            'active' => !$model->active
        ], $id);
    }
}