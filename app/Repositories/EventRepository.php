<?php

namespace App\Repositories;

use App\Models\Event;

class EventRepository extends Repository
{
    use Conditions\EventConditions;

    public function __construct(protected Event $model)
    {
        // 
    }

    public function activate($id)
    {
        $model = $this->find($id);

        $this->update([
            'active' => !$model->active
        ], $id);
    }
}