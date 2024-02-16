<?php

namespace App\Http\Requests\Participant;

use App\Models\Participant;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Http;

class JoinRequest extends FormRequest
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
            function (Validator $validator) {
                if ($this->participantExist()) {
                    $this->sendTrackingLink();
                }

                $params = sprintF('?secret=%s&response=%s', config('system.reCaptcha'), $this->reCaptcha);
                $response = Http::post('https://www.google.com/recaptcha/api/siteverify' . $params);

                if ($response->successful()) {
                    if (isset($response->json()['success']) && $response->json()['success']) {
                        return;
                    }
                }

                $validator->errors()->add(
                    'reCaptcha',
                    'reCAPTCHA validation is invalid.'
                );
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
            'email' => [
                'required',
                'email',
                Rule::prohibitedIf(
                    fn() => $this->participantExist()
                )
            ],
            'event_id' => 'required',
            'reCaptcha' => [
                'required',
            ]
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
            'email.prohibited' => 'It seems that you have already joined the event. To continue editing your application or checking the status, we have sent you a tracking link to your email address.',
        ];
    }

    protected function participantExist()
    {
        return Participant::whereEmail($this->email)
            ->whereHas('workshops', function ($builder) {
                $builder->whereEventId($this->event->id);
            })->exists();
    }

    protected function sendTrackingLink()
    {
        $model = Participant::whereEmail($this->email)->first();
        $workshop = $model->currentWorkshop($this->event->id);

        if (!$workshop->notified_at->isToday()) {
            $model->sendTrackingLink($workshop);
        }
    }
}
