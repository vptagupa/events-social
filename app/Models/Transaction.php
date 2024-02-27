<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Auth;

class Transaction extends Model
{
    use HasFactory;
    use Generators\TransactionGenerator;

    protected $fillable = [
        'code',
        'workshop_id',
        'expected_price',
        'actual_paid_amount',
        'charges',
        'price',
        'tax_amount',
        'tax',
        'paid_at',
        'is_gateway',
        'remarks',
        'file_id',
        'reference',
        'status'
    ];

    protected $casts = [
        'expected_price' => 'decimal:2',
        'actual_paid_amount' => 'decimal:2',
        'charges' => 'decimal:2',
        'price' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'paid_at' => 'datetime:Y-m-d H:i:s',
        'is_gateway' => 'boolean',
        'status' => PaymentStatus::class
    ];

    protected $appends = [
        'status_classes',
        'is_confirmed',
        'is_rejected',
        'is_cancelled',
        'is_partial',
        'has_submitted'
    ];

    public static function booted()
    {
        // Update payment status automatically when transaction changes
        $payment = function ($model) {
            $workshop = $model->workshop;

            if ($workshop->is_paid) {
                $workshop->payment_status = PaymentStatus::PAID;
                $workshop->save();
            }
        };

        static::created(function (Transaction $model) use ($payment) {
            $model->code = (new self())->generateCode();
            $model->save();

            $payment($model);
        });

        static::updated(function (Transaction $model) use ($payment) {
            $payment($model);
        });

        static::addGlobalScope('access', function (Builder $builder) {
            if (Auth::guard('organizer')->check()) {
                $builder->whereHas('workshop', function (Builder $builder) {
                    $builder->whereHas('event', function (Builder $builder) {
                        $builder->whereOrganizerId(Auth::guard('organizer')->user()->id);
                    });
                });
            } elseif (Auth::guard('web')->check()) {
                $builder->whereHas('workshop', function (Builder $builder) {
                    $builder->whereHas('participant', function (Builder $builder) {
                        $builder->whereParticipantId(Auth::guard('web')->user()->id);
                    });
                });
            }
        });
    }

    public function workshop()
    {
        return $this->belongsTo(Workshop::class);
    }
    public function transactor()
    {
        return $this->morphTo();
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }

    public function isConfirmed(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->status === PaymentStatus::CONFIRMED
        );
    }

    public function isFailed(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->status === PaymentStatus::FAILED
        );
    }

    public function isRejected(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->status === PaymentStatus::REJECTED
        );
    }

    public function isPartial(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->status === PaymentStatus::PARTIAL
        );
    }

    public function isCancelled(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->status === PaymentStatus::CANCELLED
        );
    }

    public function hasSubmitted(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->status === PaymentStatus::SUBMITTED
        );
    }

    public function statusClasses(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->getStatusClasses($this->status)
        );
    }
}
