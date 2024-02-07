<?php

namespace App\Http\Requests\Participant;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\ImageFile;
use Illuminate\Validation\Validator;

class ProofPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the "after" validation callables for the request.
     */
    public function after(): array
    {
        return [
            function (validator $validator) {
                if (
                    !$this->participant->workshop(
                        $this->event_id
                    )->first()?->submitted_at
                ) {
                    $validator->errors()->add(
                        'registration',
                        'This participant has not yet submitted a registration.'
                    );
                }
            }
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'event_id' => 'required',
            'file' => [
                'required',
                'file',
                ...ImageFile::ensure($this->file)
            ],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'event_id' => $this->event->id,
        ]);
    }

    /**
     * Handle a passed validation attempt.
     */
    protected function passedValidation(): void
    {
        $this->merge([
            'price' => $this->participant->workshop($this->event_id)->first()->offer->price
        ]);
    }
}
