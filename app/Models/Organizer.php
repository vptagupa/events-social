<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Contracts\Auditable;

class Organizer extends Authenticatable implements Auditable
{
    use HasApiTokens, HasFactory, Notifiable;
    use Notifications\OrganizerNotification;
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
        'password',
        'active'
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
        'active' => 'boolean'
    ];

    public $type = UserType::ORGANIZER;

    public $routes = [
        'logout' => 'organizer.logout',
        'password.reset' => 'organizer.password.reset',
        'login' => 'organizer.login.index',
        'auth.change-password' => 'organizer.auth.change-password'
    ];

    protected $appends = [
        'access'
    ];

    public static function booted()
    {
        static::created(function ($model) {

        });
    }

    public function fees()
    {
        return $this->hasMany(OrganizerFee::class);
    }

    public function activeFees()
    {
        return $this->fees()->active();
    }

    public function exports()
    {
        return $this->morphMany(Export::class, 'creator');
    }

    public function auditLogs(): MorphMany
    {
        return $this->morphMany(Audit::class, 'user');
    }
}
