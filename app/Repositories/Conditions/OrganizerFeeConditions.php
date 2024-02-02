<?php

namespace App\Repositories\Conditions;

trait OrganizerFeeConditions
{
    public function organizerCondition(&$builder, $query)
    {
        return $builder->when(isset($query['organizer']) && $query['organizer'], function ($builder) use ($query) {
            $builder->with('organizer');
        });
    }

    public function organizerIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['organizer_id']) && $query['organizer_id'], function ($builder) use ($query) {
            $builder->where('organizer_id', $query['organizer_id']);
        });
    }
}