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

    public function workshopParticipantCondition(&$builder, $query)
    {
        return $builder->when(isset($query['workshop_participant']) && $query['workshop_participant'], function ($builder) use ($query) {
            $builder->with('workshop.participant');
        });
    }

    public function queryCondition(&$builder, $query)
    {
        return $builder->when(isset($query['query']) && $query['query'], function ($builder) use ($query) {
            $builder->whereHas('workshop', function ($builder) use ($query) {
                $builder->orWhere('code', 'like', '%' . $query['query'] . '%')
                    ->orWhereRelation('participant', 'name', 'like', '%' . $query['query'] . '%')
                    ->orWhereRelation('participant', 'email', 'like', '%' . $query['query'] . '%');
            });
        });
    }

    public function nextCondition(&$builder, $query)
    {
        return $builder->when(isset($query['next']) && $query['next'], function ($builder) use ($query) {
            $builder->where('id', '>', $query['current_id']);
        });
    }

    public function prevCondition(&$builder, $query)
    {
        return $builder->when(isset($query['prev']) && $query['prev'], function ($builder) use ($query) {
            $builder->where('id', '<', $query['current_id']);
        });
    }
}