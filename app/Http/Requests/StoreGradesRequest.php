<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGradesRequest extends FormRequest
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
            'student_id' => 'required|string|max:255', // Ensures student_id exists in users table
            'code' => 'required|string|max:255',
            'descriptive' => 'required|string|max:255',
            'units' => 'required|integer|min:1', // Assuming a course must have at least 1 unit
            'section' => 'required|string|max:255',
            'midterm' => 'nullable|numeric|between:0,4.00', // Assuming a grade range between 0.00 and 4.00
            'final' => 'nullable|numeric|between:0,4.00',
            'reExam' => 'nullable|numeric|between:0,4.00',
            'remarks' => 'nullable|string|max:255', // Optional with a default
        ];
    }
}
