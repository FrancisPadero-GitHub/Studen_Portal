<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $table = 'enrollments';

    // To allow mass assignment of these fields, list them in the $fillable array
    protected $fillable = [
        'course',
        'student_id',
        'program',
        'enrolled_date',
        'payment_balance',
        'status',
    ];
}
