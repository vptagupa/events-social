<?php

namespace App\Repositories\Conditions;

use App\Models\SystemFee;

trait SystemFeeConditions
{
    public function eventIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event_id']) && $query['event_id'], function ($builder) use ($query) {
            $builder->select([
                \DB::raw('system_fees.*'),
                \DB::raw('IFNULL(fees.price, system_fees.price) as select_price'),
                \DB::raw('fees.active as select_active'),
            ])->leftJoin('fees', function ($builder) use ($query) {
                $builder->on('fees.model_id', '=', 'system_fees.id')
                    ->where('model_type', SystemFee::class)
                    ->where('event_id', $query['event_id']);
            });
        });
    }
}