<?php

namespace App\Models\Generators;

use App\Models\Workshop;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;

trait WorkshopGenerator
{
    protected function generateCode()
    {
        $code = Carbon::now()->format('ymdhis');
        $code = substr(str_shuffle($code . $this->id), 0, 6);

        if (Workshop::whereCode($code)->exists()) {
            return $this->generateCode();
        }

        return $code;
    }

    public function primaryName(): Attribute
    {
        return Attribute::make(
            get: function () {
                $name = explode(",", $this->event->registrationForm->primary_name);
                $names = $this->registrations()
                    ->whereIn('name', $name)
                    ->get();

                return $names->implode('value', ' ');
            }
        );
    }

    public function primaryEmail(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->registrations()
                ->where('name', $this->event->registrationForm->primary_email)
                ->first()?->value
        );
    }
}