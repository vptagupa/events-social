<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'workshop_id'
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d h:i A'
    ];

    public function workshop()
    {
        return $this->belongsTo(Workshop::class);
    }
}
