<?php

namespace App\Rules;

use App\Models\Event;
use App\Services\Griddable;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;

class Form implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $value = isset($value[0]) ? $value : [$value];

        foreach ($value as $flex) {
            Griddable::grids($flex['grids'], function ($grid, $column, $component) use ($fail) {
                if ($component['type'] === 'file' && $component['value'] instanceof UploadedFile) {
                    $types = $component['config']['file_types'] ?? "";
                    $types = array_map(fn($type) => preg_replace('/[\s.]+/', "", $type), explode(",", $types));
                    $types = array_filter(
                        $types,
                        fn($type) => str($component['value']->getClientMimeType())->contains($type)
                    );

                    if (count($types) <= 0) {
                        $fail("The field " . ($component['config']['name'] ?? "") . " contains an invalid file.");
                    }

                    // Validate in mb size
                    if (($component['value']->getSize() / 1048576) > config("system.media.max")) {
                        $fail("The field " . ($component['config']['name'] ?? "") . " contains an invalid file size.");
                    }
                }
            });
        }
    }
}
