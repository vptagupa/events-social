<?php

namespace App\Http\Requests\Participant;

use App\Models\Participant;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InviteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return T_ATTRIBUTE;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'email',
                Rule::prohibitedIf(
                    fn() => Participant::whereEmail($this->email)
                        ->whereHas('workshops', function ($builder) {
                            $builder->whereEventId($this->event->id);
                        })->exists()
                )
            ],
            'event_id' => 'required',
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
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.prohibited' => 'This email has already been invited.',
        ];
    }
}
