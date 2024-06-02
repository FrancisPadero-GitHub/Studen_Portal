<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudInfoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return false; // You can define authorization logic here if needed
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'profile_image' => 'nullable|image|max:2048', // Assuming profile image is optional and max size is 2MB
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'ext' => 'nullable|string|max:255',
            'gender' => 'required|in:Male,Female,Other', // Assuming gender should be one of these values
            'date_of_birth' => 'required|date',
            'place_of_birth' => 'required|string|max:255',
            'civil_status' => 'required|string|max:255',
            'nationality' => 'required|string|max:255',
            'religion' => 'nullable|string|max:255',
            'email' => 'required|email|unique:students_info,email',
            'contact_number' => 'nullable|string|max:20', // Assuming contact number is a string with max length 20
            'height' => 'nullable|numeric|min:0', // Assuming height is a non-negative number
            'weight' => 'nullable|numeric|min:0', // Assuming weight is a non-negative number
            'blood_type' => 'nullable|string|max:5', // Assuming blood type can be A, B, AB, O, etc.
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
