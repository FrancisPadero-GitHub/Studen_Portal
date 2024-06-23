<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;
    protected $table = 'grades';
    
    protected $fillable = [
        'student_id', // mao ni tong 2020300597 dli ni tong ID sa table mismo
        'code',
        'descriptive',
        'units',
        'section',
        'midterm',
        'final',
        'reExam',
        'remarks',
    ];
}
