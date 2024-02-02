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
}