<?php

namespace App\Http\Requests\Event;

use App\Models\Workshop;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Validator;

class StoreCertificateRequest extends FormRequest
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
            'name' => 'required|max:120',
            'file' => ['mimes:jpg,jpeg,png,pdf', (new File)->max(config("system.media.max") . 'mb')],
            'event_id' => 'required',
            'creator_type' => 'required',
            'creator_id' => 'required|integer',
            'workshop' => 'nullable|integer'
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'event_id' => $this->event->id,
            'creator_type' => get_class($this->user()),
            'creator_id' => $this->user()->id,
            'name' => (function () {
                if (empty($this->name)) {
                    $filename = explode('.', $this->file->getClientOriginalName())[0] ?? null;
                    $workshop = $this->workshop($filename);

                    if ($workshop) {
                        return $workshop->participant->name;
                    }
                }

                return $this->name;
            })()
        ]);
    }

    private function workshop($filename)
    {
        return Workshop::where([
            'code' => $filename,
            'event_id' => $this->event->id
        ])->first();
    }
}
