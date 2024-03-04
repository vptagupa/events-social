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

    public function workshopWithParticipantCondition(&$builder, $query)
    {
        return $builder->when(isset($query['workshop.participant']) && $query['workshop.participant'], function ($builder) use ($query) {
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

    public function startDateCondition(&$builder, $query)
    {
        return $builder->when(isset($query['start_date']) && $query['start_date'], function ($builder) use ($query) {
            $builder->where(\DB::raw('date(created_at)'), '>=', $query['start_date']);
        });
    }

    public function endDateCondition(&$builder, $query)
    {
        return $builder->when(isset($query['end_date']) && $query['end_date'], function ($builder) use ($query) {
            $builder->where(\DB::raw('xdate(created_at)'), '<=', $query['end_date']);
        });
    }

    public function eventIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event_id']) && $query['event_id'], function ($builder) use ($query) {
            $builder->whereHas('workshop', function ($builder) use ($query) {
                $builder->where('event_id', $query['event_id']);
            });
        });
    }

    public function statusesCondition(&$builder, $query)
    {
        return $builder->when(isset($query['statuses']) && $query['statuses'], function ($builder) use ($query) {
            $builder->whereIn('status', $query['statuses']);
        });
    }
}