<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePricingRequest extends FormRequest
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
            'price' => [
                Rule::when(!$this->event->is_free && !$this->event->is_offer_package, [
                    'required',
                    'min:1',
                    'numeric'
                ])
            ],
            'offers.*.id' => [
                Rule::when($this->event->is_offer_package, [
                    'required',
                ])
            ],
            'offers.*.name' => [
                Rule::when($this->event->is_offer_package, [
                    'required',
                    'max:25'
                ])
            ],
            'offers.*.description' => [
                Rule::when($this->event->is_offer_package, [
                    'required',
                    'max:120'
                ])
            ],
            'offers.*.price' => [
                Rule::when(!$this->event->is_free && $this->event->is_offer_package, [
                    'required',
                    'numeric',
                    'min:1'
                ])
            ]
        ];
    }

    /**
     * Update the data after passing validation.
     */
    protected function passedValidation(): void
    {
        $this->replace([
            'price' => $this->event->is_free || $this->event->is_offer_package ? 0 : $this->price
        ]);
    }
}
