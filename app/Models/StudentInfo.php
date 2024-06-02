<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentInfo extends Model
{
    protected $fillable = [
        'profile_image',
        'last_name',
        'first_name',
        'middle_name',
        'middle_initial',
        'ext',
        'gender',
        'date_of_birth',
        'place_of_birth',
        'civil_status',
        'nationality',
        'religion',
        'email',
        'contact_number',
        'height',
        'weight',
        'blood_type',
        'ethnicity',
        'address',
        'province',
        'municipality',
        'barangay',
        'zip_code',
        'emergency_contact_person',
        'emergency_address',
        'emergency_mobile_number',
    ];

    public static function rules($id = null)
    {
        return [
            'profile_image' => 'nullable|image|max:2048',
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'ext' => 'nullable|string|max:255',
            'gender' => 'required|in:Male,Female,Other',
            'date_of_birth' => 'required|date',
            'place_of_birth' => 'required|string|max:255',
            'civil_status' => 'required|string|max:255',
            'nationality' => 'required|string|max:255',
            'religion' => 'nullable|string|max:255',
            'email' => 'required|email|unique:students_info,email,' . $id,
            'contact_number' => 'nullable|string|max:20',
            'height' => 'nullable|numeric|min:0',
            'weight' => 'nullable|numeric|min:0',
            'blood_type' => 'nullable|string|max:5',
            'ethnicity' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'municipality' => 'nullable|string|max:255',
            'barangay' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
            'emergency_contact_person' => 'nullable|string|max:255',
            'emergency_address' => 'nullable|string|max:255',
            'emergency_mobile_number' => 'nullable|string|max:20',
        ];
    }
}
