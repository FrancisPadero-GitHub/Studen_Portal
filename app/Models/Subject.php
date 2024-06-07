<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    protected $table = 'subjects';
    
    protected $fillable = [
        'code',
        'description',
        'lec_unit',
        'lab_unit',
        'credit_unit',
        'section',
        'schedule',
        'teacher',
        'email',
        'status',
    ];
    
    // Add this to cast schedule to and from JSON
    protected $casts = [
        'schedule' => 'array',
    ];
}
