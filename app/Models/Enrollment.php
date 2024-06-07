<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $table = 'enrollments';

    // If your primary key is not named "id", specify it here.
    protected $primaryKey = 'enrollment_id';

    // To allow mass assignment of these fields, list them in the $fillable array
    protected $fillable = [
        'enrollment_id',
        'course',
        'student_id',
        'program',
        'enrolled_date',
        'payment_balance',
        'status',
    ];
}
