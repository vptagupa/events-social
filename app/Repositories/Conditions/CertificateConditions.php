<?php

namespace App\Repositories\Conditions;

trait CertificateConditions
{
    public function eventCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event']) && $query['event'], function ($builder) use ($query) {
            $builder->with('event');
        });
    }

    public function eventIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event_id']) && $query['event_id'], function ($builder) use ($query) {
            $builder->where('event_id', $query['event_id']);
        });
    }

    public function workshopCondition(&$builder, $query)
    {
        return $builder->when(isset($query['workshop']) && $query['workshop'], function ($builder) use ($query) {
            $builder->with('workshop');
        });
    }

    public function workshopWithParticipantCondition(&$builder, $query)
    {
        return $builder->when(isset($query['workshop.participant']) && $query['workshop.participant'], function ($builder) use ($query) {
            $builder->with('workshop.participant');
        });
    }
}