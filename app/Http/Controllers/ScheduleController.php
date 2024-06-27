<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Http\Requests\StoreScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Http\Resources\ScheduleResource;
use Illuminate\Support\Facades\Log;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ScheduleResource::collection(Schedule::query()->orderBy('id', 'desc')->get());

    }

    public function scheduleID($instructor_id)
    {

        $personal = Schedule::where('instructor_id', $instructor_id)->first();

        if (!$personal) {
            return response()->json(['error' => 'Personal Information via ID not found'], 404);
        }

        return response()->json(['data' => $personal]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduleRequest $request)
    {
        try {
            Log::info('Received request to store instructor schedule info', $request->all());

            $validatedData = $request->validated();

            $personalInfo = new Schedule($validatedData);

            $personalInfo->save();

            return response()->json(['message' => 'Instructor schedule stored successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Error storing Instructor schedule', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to store Instructor schedule'], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleRequest $request, Schedule $schedule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        //
    }
}
