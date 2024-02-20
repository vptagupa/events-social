<?php

namespace App\Http\Requests\Participant;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'flexis' => 'required',
            'flexis.*.grids' => 'required',
            'flexis.*.grids.*.columns' => 'required',
            'flexis.*.grids.*.columns.*.components' => 'required',

        ];
    }

    /**
     * Prepare data before validation
     */
    public function prepareForValidation()
    {
        // Filter out grids and columns without elements
        // To exclude in the validations
        $flexis = array_map(function ($flex) {
            $flex['grids'] = array_filter($flex['grids'], fn($grid) => count($grid['columns']) > 0);
            $flex['grids'] = array_map(function ($grid) {
                $grid['columns'] = array_filter($grid['columns'], fn($column) => count($column['components']) > 0);
                return $grid;
            }, $flex['grids']);

            return $flex;
        }, $this->flexis);

        $this->replace([
            'flexis' => $flexis
        ]);

        $this->merge([
            'event_id' => $this->workshop->event_id,
        ]);
    }
}
