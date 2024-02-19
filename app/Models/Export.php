<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Export extends Model
{
    use HasFactory;

    protected $fillable = [
        'filename',
        'path',
        'criteria'
    ];

    protected $casts = [
        'criteria' => 'array'
    ];

    protected $appends = [
        'url'
    ];

    public function url(): Attribute
    {
        return Attribute::make(
            get: fn() => asset('storage/' . str_replace('public/', '', $this->path))
        );
    }

    public function exportable()
    {
        return $this->morphTo();
    }

    public function creator()
    {
        return $this->morphTo();
    }
}
