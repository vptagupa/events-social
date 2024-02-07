<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rules\File as FileValidator;
use Illuminate\Http\UploadedFile;

class ImageFile implements ValidationRule
{
    /**
     * All of the data under validation.
     *
     * @var array<string, mixed>
     */
    protected $data = [];

    /**
     * Set the data under validation.
     *
     * @param  array<string, mixed>  $data
     */
    public function setData(array $data): static
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
    }

    public static function ensure($file)
    {
        $types = ['jpg', 'jpeg', 'png'];

        if (!$file instanceof UploadedFile) {
            return [];
        }

        return [
            FileValidator::types([
                ...$types,
            ])
                ->max(config('system.media.image.max') * 1024),
        ];
    }
}
