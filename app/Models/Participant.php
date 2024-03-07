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
use OwenIt\Auditing\Contracts\Auditable;

class Participant extends Authenticatable implements Auditable
{
    use HasApiTokens, HasFactory, Notifiable;
    use Notifications\ParticipantNotification;
    use Relations\Permission;
    use \OwenIt\Auditing\Auditable;

    /**
     * Attributes to exclude from the Audit.
     *
     * @var array
     */
    protected $auditExclude = [
        'password',
    ];

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
        'is_confirmed',
        'access'
    ];

    public $routes = [
        'logout' => 'participant.logout',
        'password.reset' => 'participant.password.reset',
        'login' => 'participant.login.index',
        'auth.change-password' => 'participant.auth.change-password'
    ];

    public $type = UserType::PARTICIPANT;

    public static function booted()
    {
        static::addGlobalScope('access', function (Builder $builder) {
            if (\Auth::guard('organizer')->check() && !\Auth::guard('admin')->check()) {
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
        $model = $this->hasMany(Workshop::class);
        if (\Auth::guard('organizer')->check() && !\Auth::guard('admin')->check()) {
            $model->whereRelation('event', 'organizer_id', \Auth::guard('organizer')->user()->id);
        }

        return $model->orderBy('id', 'desc');
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
