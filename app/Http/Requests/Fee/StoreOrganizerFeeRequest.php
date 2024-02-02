<?php

namespace App\Http\Requests\Fee;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrganizerFeeRequest extends FormRequest
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
            'organizer_id' => 'required|integer',
            'name' => 'required|max:25',
            'price' => 'required|numeric',
            'active' => 'required|boolean'
        ];
    }

    /**
     * Prepare inputs for validation
     */
    public function prepareForValidation(): void
    {
        $this->merge([
            'organizer_id' => $this->organizer->id
        ]);
    }
}
