<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScheduleRequest extends FormRequest
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
            'instructor_id' =>'nullable|string|max:25',
            'day' => 'nullable|string|max:255',
            'time' => 'nullable|string|max:255',
            'course' => 'nullable|string|max:255',
            'section' => 'nullable|string|max:255',
            'room' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:255',
        ];
    }
}
