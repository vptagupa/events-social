<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemFee extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'active'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    public function eventFee()
    {
        return $this->morphMany(Fee::class, 'model');
    }

    public function scopeActive($query)
    {
        $query->whereActive(1);
    }
}
