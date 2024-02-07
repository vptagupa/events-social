<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Storage;

class File extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'filename',
        'orig_filename',
        'uri',
        'path',
        'type',
        'size',
    ];

    protected $appends = [
        'url',
        'is_image',
        'is_video',
    ];

    public static function booted()
    {
        static::deleted(function ($file) {
            if ($file) {
                Storage::delete('app/' . $file->path);
            }
        });
    }

    public function url(): Attribute
    {
        return Attribute::make(
            get: fn() => asset('storage/' . str_replace('public/', '', $this->path))
        );
    }

    public function isImage(): Attribute
    {
        return Attribute::make(
            get: fn() => str($this->type)->startsWith('image/')
        );
    }

    public function isVideo(): Attribute
    {
        return Attribute::make(
            get: fn() => str($this->type)->startsWith('video/')
        );
    }
}
