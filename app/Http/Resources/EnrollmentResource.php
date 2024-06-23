<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EnrollmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'course' => $this->course,
            'student_id' => $this-> student_id,
            'program' => $this->program,
            'enrolled_date' => $this->enrolled_date,
            'payment_balance' => $this->payment_balance,
            'status' => $this->status,
        ];
    }
}
