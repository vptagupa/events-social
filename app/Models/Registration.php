<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use OwenIt\Auditing\Contracts\Auditable;

class Registration extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

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

    public function newValue($type)
    {
        if ($type == 'file') {
            return File::find($this->value);
        }

        return $this->value;
    }
}
