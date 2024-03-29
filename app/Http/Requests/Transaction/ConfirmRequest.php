<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\File;
use Illuminate\Validation\Rule;

class ConfirmRequest extends FormRequest
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
                Rule::when($this->file ? true : false, File::ensure())
            ],
            'amount' => [
                'required',
                'numeric',
                'gte:' . $this->transaction->workshop->balance
            ],
            'remarks' => 'nullable'
        ];
    }
}
