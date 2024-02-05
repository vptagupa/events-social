<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    protected $table = 'event_offers';

    protected $fillable = [
        'event_id',
        'name',
        'description',
        'price',
        'active'
    ];

    protected $casts = [
        'price' => 'decimal:2'
    ];

    protected function event()
    {
        return $this->belongsTo(Event::class);
    }
}
