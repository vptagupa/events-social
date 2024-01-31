<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
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
        'is_offer_package',
        'banner_id',
        'certificate_file_id',
        'official_receipt_file_id',
        'organizer_id',
        'active'
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
    ];

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
}
