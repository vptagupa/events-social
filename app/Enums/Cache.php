<?php

namespace App\Enums;

use Cache as facade;

enum Cache: string
{
    case SETTING = "setting";

    public static function clearEvent(int $event)
    {
        facade::forget(Cache::eventSettingKey($event));
    }

    public static function eventSettingKey(int $event)
    {
        return Cache::SETTING->value . '_' . $event;
    }
}