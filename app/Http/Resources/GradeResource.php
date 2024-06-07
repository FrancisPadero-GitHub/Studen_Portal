<?php

namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
class GradeResource extends JsonResource

{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'code' => $this->code,
            'descriptive' => $this->descriptive,
            'units' => $this->units,
            'section' => $this->section,
            'midterm' => $this->midterm,
            'final' => $this->final,
            'reExam' => $this->reExam,
            'remarks' => $this->remarks,
        ];
    }
}
