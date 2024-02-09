<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    use HasFactory, HasUuids;
    use Generators\WorkshopGenerator;

    protected $fillable = [
        'uuid',
        'code',
        'event_id',
        'participant_id',
        'offer_id',
        'payment_status',
        'notified_at',
        'accepted_at',
        'submitted_at',
        'confirmed_at'
    ];

    protected $casts = [
        'payment_status' => PaymentStatus::class,
        'notified_at' => 'datetime:Y-m-d H:is',
        'submitted_at' => 'datetime:Y-m-d H:is',
        'confirmed_at' => 'datetime:Y-m-d H:is',
        'accepted_at' => 'datetime:Y-m-d H:is',
    ];

    protected $appends = [
        'is_accepted'
    ];

    public static function booted()
    {
        static::created(function (Workshop $model) {
            $model->code = (new self)->generateCode();
            $model->save();

            // Send participant invitation email
            $model->participant->sendInvitation($model);
        });
    }

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return array<int, string>
     */
    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    public function isAccepted(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->accepted_at ? true : false
        );
    }

    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
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
