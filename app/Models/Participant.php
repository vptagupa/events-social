<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Enums\UserType;

class Participant extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use Notifications\ParticipantNotification;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'confirmed_at',
        'password',
        'login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'confirmed_at' => 'datetime',
        'login_at' => 'datetime',
    ];

    protected $appends = [
        'is_confirmed'
    ];

    public $type = UserType::PARTICIPANT;

    public static function booted()
    {
        static::addGlobalScope('access', function (Builder $builder) {
            if (\Auth::guard('organizer')->check()) {
                $builder->whereHas('workshops', function (Builder $builder) {
                    $builder->whereHas('event', function (Builder $builder) {
                        $builder->whereOrganizerId(\Auth::guard('organizer')->user()->id);
                    });
                });
            }
        });
    }

    public function isConfirmed(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->confirmed_at ? true : false
        );
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function workshops(): HasMany
    {
        return $this->hasMany(Workshop::class);
    }

    public function currentWorkshop(int $event)
    {
        return $this->workshops()->where('event_id', $event)->first();
    }

    public function scopeWorkshop($query, int $event)
    {
        return $query->whereHas('workshops', function ($builder) use ($event) {
            $builder->whereEventId($event);
        });
    }
}
