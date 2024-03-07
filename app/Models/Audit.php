<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    public function event(): Attribute
    {
        return Attribute::make(
            get: fn($value) => str($value)->ucfirst()
        );
    }

    public function user()
    {
        return $this->morphTo();
    }
}
