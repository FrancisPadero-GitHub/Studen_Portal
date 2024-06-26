<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInstructorRequest extends FormRequest
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
            'instructor_id' => 'nullable|string|max:25',
            'login_id' => 'nullable|string|max:25',
            'campus' => 'nullable|string|max:255',
            'program' => 'nullable|string|max:255',
            'sections' => 'nullable|string|max:255',
            'subjects' => 'nullable|string|max:255',
        ];
    }
}
