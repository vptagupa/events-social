<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'workshop_id',
        'file_id',
        'name',
        'downloads',
        'prints',
        'sents',
        'creator_type',
        'creator_id'
    ];

    public static function booted()
    {
        $linkWorkshop = function ($model) {
            $filename = explode('.', $model->file->orig_filename)[0] ?? null;
            if ($filename) {
                $workshop = Workshop::where([
                    'code' => $filename,
                    'event_id' => $model->event_id
                ])->first();
                if ($workshop) {
                    $model->workshop()->associate($workshop);
                    if (empty ($model->name)) {
                        $model->name = $workshop->participant->name;
                    }
                    $model->save();
                }
            }
        };
        static::created(function ($model) use ($linkWorkshop) {
            if ($model->file && !$model->workshop) {
                $linkWorkshop($model);
            }
        });

        static::updated(function ($model) use ($linkWorkshop) {
            if ($model->file && !$model->workshop) {
                $linkWorkshop($model);
            }
        });
    }

    public function creator()
    {
        return $this->morphTo();
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function workshop()
    {
        return $this->belongsTo(Workshop::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
