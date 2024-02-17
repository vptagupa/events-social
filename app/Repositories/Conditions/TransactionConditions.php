<?php

namespace App\Repositories\Conditions;

use App\Models\OrganizerFee;

trait TransactionConditions
{
    public function workshopIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['workshop_id']) && $query['workshop_id'], function ($builder) use ($query) {
            $builder->where('workshop_id', $query['workshop_id']);
        });
    }

    public function fileCondition(&$builder, $query)
    {
        return $builder->when(isset($query['file']) && $query['file'], function ($builder) use ($query) {
            $builder->with('file');
        });
    }
}