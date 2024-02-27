<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use App\Services\Payment;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    use HasFactory, HasUuids, Notifiable;
    use Generators\WorkshopGenerator;
    use Notifications\WorkshopNotification;

    protected $fillable = [
        'code',
        'event_id',
        'participant_id',
        'offer_id',
        'payment_status',
        'notified_at',
        'accepted_at',
        'submitted_at',
        'payment_at',
        'confirmed_at',
        'invited_at',
        'cancelled_at',
        'amount',
        'note'
    ];

    protected $casts = [
        'payment_status' => PaymentStatus::class,
        'notified_at' => 'datetime:Y-m-d H:i:s',
        'submitted_at' => 'datetime:Y-m-d H:i:s',
        'confirmed_at' => 'datetime:Y-m-d H:i:s',
        'payment_at' => 'datetime:Y-m-d H:i:s',
        'accepted_at' => 'datetime:Y-m-d H:i:s',
        'cancelled_at' => 'datetime:Y-m-d H:i:s',
        'amount' => 'decimal:2'
    ];

    protected $appends = [
        'has_accepted',
        'has_notified',
        'has_submitted',
        'is_invited',
        'is_confirmed',
        'price',
        'has_payment',
        'is_cancelled',
        'statuses'
    ];

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return array<int, string>
     */
    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    public static function booted()
    {
        static::created(function (Workshop $model) {
            $model->code = (new self)->generateCode();
            $model->save();

            if ($model->is_invited) {
                $model->participant->sendInvitation($model);
            } else {
                $model->participant->sendTrackingLink($model);
            }
        });
    }


    public function hasAccepted(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->accepted_at ? true : false
        );
    }

    public function hasSubmitted(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->submitted_at ? true : false
        );
    }

    public function hasNotified(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->notified_at ? true : false
        );
    }

    public function isInvited(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->invited_at ? true : false
        );
    }

    public function isCancelled(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->cancelled_at ? true : false
        );
    }

    public function hasPayment(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->payment_at ? true : false
        );
    }

    public function isConfirmed(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->confirmed_at ? true : false
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

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function price(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->event?->is_offer_package ? $this->offer?->price ?? 0 : $this->event?->price
        );
    }

    public function priceBreakdown()
    {
        return Payment::calculate(
            $this->event_id,
            $this->price,
            config('system.include_tax') ? config('system.tax') : 0
        );
    }

    public function isFullyPaid(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->balance <= 0
        );
    }

    public function balance(): Attribute
    {
        return Attribute::make(
            get: fn() => round($this->amount - $this->transactions->reject(
                fn($trans) => $trans->status === PaymentStatus::CANCELLED
            )->sum('actual_paid_amount'), 2)
        );
    }

    public function paid(): Attribute
    {
        return Attribute::make(
            get: fn() => round($this->transactions->reject(
                fn($trans) => $trans->status === PaymentStatus::CANCELLED
            )->sum('actual_paid_amount'), 2)
        );
    }

    public function paymentStatusClasses(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->statusClasses($this->payment_status)
        );
    }

    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }
}
