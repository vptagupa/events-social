<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    use HasFactory;
    use Generators\WorkshopGenerator;

    protected $fillable = [
        'code',
        'event_id',
        'participant_id',
        'registration_form_id',
        'offer_id',
        'payment_status',
        'notified_at',
        'submitted_at',
        'confirmed_at'
    ];

    protected $casts = [
        'payment_status' => PaymentStatus::class,
        'notified_at' => 'datetime:Y-m-d H:is',
        'submitted_at' => 'datetime:Y-m-d H:is',
        'confirmed_at' => 'datetime:Y-m-d H:is',
    ];

    public static function booted()
    {
        static::created(function (Workshop $model) {
            $model->code = (new self)->generateCode();
            $model->save();
        });
    }

    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function registrationForm()
    {
        return $this->belongsTo(RegistrationForm::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}