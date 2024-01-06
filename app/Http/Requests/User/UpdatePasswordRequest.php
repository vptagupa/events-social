<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\Password;
use Illuminate\Support\Facades\Hash;

class UpdatePasswordRequest extends FormRequest
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
            'current_password' => 'required|current_password',
            'password' => ['required', 'confirmed', ...Password::ensure()],
            'password_confirmation' => 'required'
        ];
    }

    /**
     * Handle updated data after validation
     */
    public function passedValidation()
    {
        $this->replace(['password' => Hash::make($this->password)]);
    }
}
