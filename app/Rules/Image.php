<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rules\File as ValidatorFile;

class Image implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
    }

    public static function ensure()
    {
        return [
            'file',
            'mimes:jpg,jpeg,png',
            (new ValidatorFile)->max(config("system.media.max") . 'mb')
        ];
    }
}
