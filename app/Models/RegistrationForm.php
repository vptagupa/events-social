<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class RegistrationForm extends Model implements Auditable
{
    use HasFactory;
    use Generators\RegistrationFormGenerator;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'primary_name',
        'primary_email',
        'salutation',
        'schema',
        'published_at'
    ];

    protected $casts = [
        'schema' => 'array',
        'published_at' => 'datetime: Y-m-d H:i:s a'
    ];

    protected $appends = [
        'is_published'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function isPublished(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->published_at ? true : false
        );
    }
}
