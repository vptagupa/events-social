<?php

namespace App\Http\Requests\Participant;

use App\Rules\ImageFile;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
                Rule::when($this->method == "upload", ImageFile::ensure($this->file))
            ],
            'method' => ['required', Rule::in(['upload', 'gateway'])]
        ];
    }
}
