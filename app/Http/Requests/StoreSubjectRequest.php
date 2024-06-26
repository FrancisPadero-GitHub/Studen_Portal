<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubjectRequest extends FormRequest
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
            'student_id' => 'nullable|string|max:255',
            'code' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'lec_unit' => 'nullable|integer',
            'lab_unit' => 'nullable|integer',
            'credit_unit' => 'nullable|integer',
            'section' => 'nullable|string|max:255',
            'schedule' => 'nullable|array',
            'schedule.*' => 'nullable|string', // Assuming each schedule item is a string
            'teacher' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'status' => 'nullable|string|max:255',
        ];
    }
}
