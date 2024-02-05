<?php

namespace App\Repositories;

use App\Models\Event;
use App\Models\EventSetting;
use App\Models\Setting;

class SettingRepository extends Repository
{
    use Conditions\SettingConditions;
    public function __construct(protected Setting $model)
    {

    }

    public function updateEvent(Event $event, int $setting, bool $checked)
    {
        $setting = $this->find($setting);

        $model = $event->settings->filter(fn($s) => $s->setting_id == $setting->id)->first();
        if ($model) {
            $model->value = $checked;
            return $model->save();
        }

        $event->settings()->save(
            new EventSetting([
                'setting_id' => $setting->id,
                'value' => $checked
            ])
        );
    }
}