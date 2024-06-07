<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEnrollmentRequest extends FormRequest
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
    public function rules()
    {
        return [
            'enrollment_id' => 'required',
            'course' => 'nullable|string|max:255',
            'student_id' => 'nullable|string|max:25',
            'program' => 'nullable|string|max:255',
            'enrolled_date' => 'nullable|date',
            'payment_balance' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
        ];
    }
}
