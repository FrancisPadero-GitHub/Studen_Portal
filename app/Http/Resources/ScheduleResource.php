<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'instructor_id' => $this->instructor_id,
            'day' => $this->day,
            'time' => $this->time,
            'course' => $this->course,
            'section' => $this->section,
            'room' => $this->room,
            'notes' => $this->notes,
        ];
    }
}
