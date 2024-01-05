<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password as PasswordRule;

class Password implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (Auth::check()) {
            if (Hash::check($value, Auth::user()->password)) {
                $fail("Use different {$attribute}.");
                return;
            }
        }

        if (Hash::check($value, bcrypt(config('auth.default_password')))) {
            $fail("Use different {$attribute}.");
        }
    }

    public static function ensure(): array
    {
        return [
            PasswordRule::min(6)->uncompromised()->letters()->numbers(),
            new Password()
        ];
    }
}
