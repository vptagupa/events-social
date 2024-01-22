<?php

namespace App\Repositories\Conditions;

trait EventConditions
{
    public function organizerCondition(&$builder, $query)
    {
        return $builder->when(isset($query['organizer']) && $query['organizer'], function ($builder) use ($query) {
            $builder->with('organizer');
        });
    }
}