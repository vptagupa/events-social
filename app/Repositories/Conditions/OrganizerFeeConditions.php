<?php

namespace App\Repositories\Conditions;

use App\Models\OrganizerFee;

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

    public function eventIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event_id']) && $query['event_id'], function ($builder) use ($query) {
            $builder->select([
                \DB::raw('organizer_fees.*'),
                \DB::raw('IFNULL(fees.price, organizer_fees.price) as select_price'),
                \DB::raw('fees.active as select_active'),
            ])->leftJoin('fees', function ($builder) use ($query) {
                $builder->on('fees.model_id', '=', 'organizer_fees.id')
                    ->where('model_type', OrganizerFee::class)
                    ->where('event_id', $query['event_id']);
            });
        });
    }
}