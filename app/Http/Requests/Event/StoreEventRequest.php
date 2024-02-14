<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class StoreEventRequest extends FormRequest
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
            'title' => 'required|max:120',
            'slug' => 'required:max:150',
            'description' => 'required|max:400',
            'place' => 'required|max:250',
            'address' => 'required|max:400',
            'map' => 'nullable|max:400',
            'start_at' => 'required|date',
            'end_at' => 'required|date',
            'expected_start_at' => 'required|date',
            'expected_end_at' => 'required|date',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => str($this->slug)->slug(),
            'expected_start_at' => $this->start_at,
            'expected_end_at' => $this->end_at,
            'organizer_id' => $this->organizer->id
        ]);
    }

    /**
     * Update the data after passing validation.
     */
    protected function passedValidation(): void
    {
        $this->replace([
            ...$this->all(),
            'slug' => str($this->slug)->slug(),
            'expected_start_at' => Carbon::parse($this->start_at)->format('Y-m-d H:i:s'),
            'expected_end_at' => Carbon::parse($this->end_at)->format('Y-m-d H:i:s'),
        ]);
    }
}
