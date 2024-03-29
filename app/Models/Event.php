<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Auth;

class Event extends Model implements Auditable
{
    use HasFactory, HasUuids;
    use Relations\EventSetting;
    use \OwenIt\Auditing\Auditable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'slug',
        'title',
        'description',
        'place',
        'address',
        'map',
        'expected_start_at',
        'expected_end_at',
        'actual_started_at',
        'actual_ended_at',
        'banner_id',
        'certificate_file_id',
        'official_receipt_file_id',
        'organizer_id',
        'active',
        'price',
        'published_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'active' => 'boolean',
        'is_offer_package' => 'boolean',
        'expected_start_at' => 'date:m/d/Y h:i A',
        'expected_end_at' => 'date:m/d/Y h:i A',
        'actual_started_at' => 'date:m/d/Y h:i A',
        'actual_ended_at' => 'date:m/d/Y h:i A',
        'price' => 'decimal:2',
        'published_at' => 'datetime: Y-m-d H:i:s a'
    ];

    protected $appends = [
        'is_offer_package',
        'is_free',
        'is_allowed_upload_proof_payment',
        'is_allowed_payment_integration',
        'is_published',
        'start_at'
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
        static::created(function (Event $event) {
            $fees = SystemFee::active()->get();
            $event->systemFees()->saveMany($fees->map(function (SystemFee $fee) {
                return new Fee(
                    [
                        'model_type' => SystemFee::class,
                        'model_id' => $fee->id,
                        'price' => $fee->price,
                        'active' => 1
                    ]
                );
            }));
        });

        static::addGlobalScope('access', function (Builder $builder) {
            if (Auth::guard('organizer')->check()) {
                $builder->whereOrganizerId(Auth::guard('organizer')->user()->id);
            } elseif (Auth::guard('web')->check()) {
                $builder->whereHas('workshops', function (Builder $builder) {
                    $builder->whereParticipantId(Auth::guard('participant')->user()->id);
                });
            }
        });
    }

    public function isPublished(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->published_at ? true : false
        );
    }

    public function startAt(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->expected_start_at->format('F j, Y, h:i a')
        );
    }

    public function organizer()
    {
        return $this->belongsTo(Organizer::class);
    }

    public function files()
    {
        return $this->morphMany(File::class, 'created');
    }

    public function certificate()
    {
        return $this->hasOne(File::class, 'certificate_file_id');
    }

    public function officialReceipt()
    {
        return $this->hasOne(File::class, 'official_receipt_file_id');
    }

    public function registrationForm()
    {
        return $this->hasOne(RegistrationForm::class);
    }

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }

    public function fees()
    {
        return $this->hasMany(Fee::class);
    }

    public function organizerFees()
    {
        return $this->fees()->whereModelType(OrganizerFee::class);
    }

    public function systemFees()
    {
        return $this->fees()->whereModelType(SystemFee::class);
    }

    public function settings()
    {
        return $this->hasMany(EventSetting::class);
    }

    public function exports()
    {
        return $this->morphMany(Export::class, 'exportable');
    }

    public function workshops()
    {
        return $this->hasMany(Workshop::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }
}
