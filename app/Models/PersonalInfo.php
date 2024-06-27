<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonalInfo extends Model
{
    protected $table = 'personal_information';
    
    protected $fillable = [
        'info_id',
        'last_name',
        'first_name',
        'middle_name',
        'middle_initial',
        'ext',
        'gender',
        'age',
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
}
