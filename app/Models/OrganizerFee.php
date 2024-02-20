<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrganizerFee extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'name',
        'price',
        'active'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    public static function booted()
    {
        static::addGlobalScope('access', function (Builder $builder) {
            if (\Auth::guard('organizer')->check()) {
                $builder->whereOrganizerId(\Auth::guard('organizer')->user()->id);
            }
        });
    }

    public function organizer()
    {
        return $this->belongsTo(Organizer::class);
    }

    public function scopeActive($query, $active = true)
    {
        return $query->whereActive($active);
    }

    public function eventFee()
    {
        return $this->morphMany(Fee::class, 'model');
    }
}
