<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use Relations\EventSetting;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'slug',
        'title',
        'description',
        'expected_start_at',
        'expected_end_at',
        'actual_started_at',
        'actual_ended_at',
        'banner_id',
        'certificate_file_id',
        'official_receipt_file_id',
        'organizer_id',
        'active',
        'price'
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
        'price' => 'decimal:2'
    ];

    protected $appends = [
        'is_offer_package',
        'is_free',
        'is_allowed_upload_proof_payment',
        'is_allowed_payment_integration'
    ];

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
}
