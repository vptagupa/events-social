<?php

namespace App\Models;

use App\Enums\Cache;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'setting_id',
        'value'
    ];

    public function setting()
    {
        return $this->belongsTo(Setting::class);
    }

    public static function booted()
    {
        static::created(function (EventSetting $model) {
            Cache::clearEvent($model->event_id);
        });

        static::updated(function (EventSetting $model) {
            Cache::clearEvent($model->event_id);
        });
    }
}
