<?php

namespace App\Repositories\Conditions;

use App\Models\EventSetting;
use App\Models\Setting;

trait SettingConditions
{
    public function eventIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event_id']) && $query['event_id'], function ($builder) use ($query) {
            $builder->addSelect([
                'select_active' => EventSetting::select('value')->whereEventId($query['event_id'])
                    ->whereColumn('setting_id', 'settings.id')
                    ->limit(1)

            ])
                ->whereIn('id', Setting::$events);
        });
    }
}