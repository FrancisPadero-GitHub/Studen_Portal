<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePersonalInfoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true; // You can define authorization logic here if needed
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'info_id' => 'nullable|string|max:25',
            'email' => 'nullable|email|max:255',
            'last_name' => 'nullable|string|max:255',
            'first_name' => 'nullable|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'ext' => 'nullable|string|max:255',
            'gender' => 'nullable|in:Male,Female,Other', // Assuming gender should be one of these values
            'age' => 'nullable|string|max:2',
            'date_of_birth' => 'nullable|date',
            'place_of_birth' => 'nullable|string|max:255',
            'civil_status' => 'nullable|string|max:255',
            'nationality' => 'nullable|string|max:255',
            'religion' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:20', // Assuming contact number is a string with max length 20
            'height' => 'nullable|numeric|min:0', // Assuming height is a non-negative number
            'weight' => 'nullable|numeric|min:0', // Assuming weight is a non-negative number
            'blood_type' => 'nullable|string|max:6', // Assuming blood type can be A, B, AB, O, etc.
            'ethnicity' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'municipality' => 'nullable|string|max:255',
            'barangay' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20', // Assuming zip code is a string with max length 20
            'emergency_contact_person' => 'nullable|string|max:255',
            'emergency_address' => 'nullable|string|max:255',
            'emergency_mobile_number' => 'nullable|string|max:20', // Assuming mobile number is a string with max length 20
        ];
    }
}
