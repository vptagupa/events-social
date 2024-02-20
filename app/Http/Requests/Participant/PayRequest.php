<?php

namespace App\Http\Requests\Participant;

use App\Rules\ImageFile;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class PayRequest extends FormRequest
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
            'file' => [
                'required_if:method,upload',
                Rule::when($this->request->get('method') == "upload", ['mimes:jpg,jpeg,png,pdf', (new File)->max('5mb')]),
            ],
            'method' => ['required', Rule::in(['upload', 'gateway'])],
            'reference' => 'required'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'file.required_if' => 'Proof of payment is required.',
            'method.required' => 'Choose payment gateway.',
        ];
    }
}
