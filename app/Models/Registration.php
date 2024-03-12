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

    public static function booted()
    {
        $updateCertificateName = function (Registration $model) {
            if (str($model->workshop->event->registrationForm->primary_name)->contains($model->name)) {
                $certificate = $model->workshop->certificates()->whereNull('file_id')->first();
                if ($certificate) {
                    $certificate->name = $model->workshop->name;
                    $certificate->save();
                }
            }
        };

        static::created(function (Registration $model) use ($updateCertificateName) {
            $updateCertificateName($model);
        });

        static::updated(function (Registration $model) use ($updateCertificateName) {
            $updateCertificateName($model);
        });
    }

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
