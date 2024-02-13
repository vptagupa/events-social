<?php

namespace App\Repositories\Conditions;

trait ParticipantCondition
{

    public function eventIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event_id']) && $query['event_id'], function ($builder) use ($query) {
            $builder->with([
                'workshops' => function ($builder) use ($query) {
                    $builder->where('event_id', $query['event_id']);
                }
            ])
                ->whereHas('workshops', function ($builder) use ($query) {
                    $builder->where('event_id', $query['event_id']);
                });
        });
    }

    public function eventCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event']) && $query['event'], function ($builder) use ($query) {
            $builder->with([
                'workshops.event'
            ]);
        });
    }

    public function eventOrganizerCondition(&$builder, $query)
    {
        return $builder->when(isset($query['eventOrganizer']) && $query['eventOrganizer'], function ($builder) use ($query) {
            $builder->with([
                'workshops.event.organizer'
            ]);
        });
    }

    public function queryCondition(&$builder, $query)
    {
        return $builder->when(isset($query['query']) && $query['query'], function ($builder) use ($query) {
            $builder->where('name', 'like', '%' . $query['query'] . '%')
                ->orWhere('email', 'like', '%' . $query['query'] . '%')
                ->orWhereHas('workshops', function ($builder) use ($query) {
                    $builder->where('code', 'like', '%' . $query['query'] . '%');
                });
        });
    }
}