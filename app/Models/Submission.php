<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'workshop_id',
        'schema'
    ];

    protected $casts = [
        'schema' => 'array'
    ];

    public function workshop()
    {
        return $this->belongsTo(Workshop::class);
    }
}
