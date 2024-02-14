<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'workshop_id',
        'flex',
        'grid',
        'column',
        'component',
        'name',
        'value'
    ];

    public function workshop()
    {
        return $this->belongsTo(Workshop::class);
    }
}
