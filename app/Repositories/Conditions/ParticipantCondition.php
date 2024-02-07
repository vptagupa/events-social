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