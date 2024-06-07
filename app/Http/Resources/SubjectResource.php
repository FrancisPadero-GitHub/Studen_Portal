<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'student_id' => $this->student_id,
            'code' => $this->code,
            'description' => $this->description,
            'lec_unit' => $this->lec_unit,
            'lab_unit' => $this->lab_unit,
            'credit_unit' => $this->credit_unit,
            'section' => $this->section,
            'schedule' => $this->schedule,
            'teacher' => $this->teacher,
            'email' => $this->email,
            'status' => $this->status
        ];
    }
}
