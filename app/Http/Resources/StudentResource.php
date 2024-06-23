<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'last_name' => $this->last_name,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'middle_initial' => $this->middle_initial,
            'ext' => $this->ext,
            'gender' => $this->gender,
            'age' => $this->age,
            'date_of_birth' => $this->date_of_birth,
            'place_of_birth' => $this->place_of_birth,
            'civil_status' => $this->civil_status,
            'nationality' => $this->nationality,
            'religion' => $this->religion,
            'email' => $this->email,
            'password' => $this->password,
            'contact_number' => $this->contact_number,
            'height' => $this->height,
            'weight' => $this->weight,
            'blood_type' => $this->blood_type,
            'ethnicity' => $this->ethnicity,
            'address' => $this->address,
            'province' => $this->province,
            'municipality' => $this->municipality,
            'barangay' => $this->barangay,
            'zip_code' => $this->zip_code,
            'emergency_contact_person' => $this->emergency_contact_person,
            'emergency_address' => $this->emergency_address,
            'emergency_mobile_number' => $this->emergency_mobile_number,
        ];
    }
}


