<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return StudentResource::collection(Student::query()->orderBy('id', 'desc')->get());
    }



    public function fetchPersonalInfo($student_id)
    {

        $personal = Student::where('student_id', $student_id)->first();

        if (!$personal) {
            return response()->json(['error' => 'Personal Information via ID not found'], 404);
        }

        return response()->json(['data' => $personal]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        try {
            Log::info('Received request to store personal info', $request->all());

            $validatedData = $request->validated();

            $personalInfo = new Student($validatedData);

            $personalInfo->save();

            return response()->json(['message' => 'Personal information stored successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Error storing personal info', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to store personal information'], 500);
        }
    }
    
    public function destroy($student_id)
    {
        // Find the admin by student_id
        $instructor = Student::where('student_id', $student_id)->first();

        if (!$instructor) {
            // If instruc$instructor with given instructor$instructor_id doesn't exist, return a 404 error
            return response()->json(['error' => 'instructor not found'], 404);
        }

        // Delete the instruc$instructor
        $instructor->delete();

        // Return a success message
        return response()->json(['message' => 'Admin information deleted successfully']);
    }




    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
}
