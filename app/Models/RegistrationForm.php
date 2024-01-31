<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrationForm extends Model
{
    use HasFactory;

    protected $table = 'event_registration_forms';

    protected $fillable = [
        'schema'
    ];

    protected $casts = [
        'schema' => 'array'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
