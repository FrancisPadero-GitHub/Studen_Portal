<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudInfoRequest;
use App\Http\Requests\UpdateStudRequest;
use App\Models\StudentInfo;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\StudentResource;

class InformationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return StudentResource::collection(StudentInfo::query()->orderBy('id', 'desc')->get());
    }

    // This function refers to the specific student_id model in the database
    public function getStudentByStudentId($student_id)
    {
        // Assuming 'student_id' is a column in the students table
        $student = StudentInfo::where('student_id', $student_id)->first();

        if (!$student) {
            return response()->json(['error' => 'Student not found'], 404);
        }

        return response()->json(['data' => $student]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudInfoRequest $request)
    {
        try {
            Log::info('Received request to store student info', $request->all());

            $validatedData = $request->validated();
            
            $studentInfo = new StudentInfo($validatedData);

            $studentInfo->save();

            return response()->json(['message' => 'Student information stored successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Error storing student info', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to store student information'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudRequest $request, $studentInfoId)
    {
        try {
            // Find the StudentInfo object by ID
            $studentInfo = StudentInfo::findOrFail($studentInfoId);

            // Log the incoming request data
            Log::info('Incoming request data for Update:', $request->all());

            // Validate the incoming request
            $validatedData = $request->validated();

            // Update the StudentInfo object with the validated data
            $studentInfo->update($validatedData);

            // Return a success response
            return response()->json(['message' => 'Student information updated successfully'], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error updating student info', ['error' => $e->getMessage()]);

            // Return an error response
            return response()->json(['error' => 'Failed to update student information'], 500);
        }
    }

    public function updateByStudentID(UpdateStudRequest $request, $studentInfoId)
    {
        try {
            // Find the StudentInfo object by student_id
            $studentInfo = StudentInfo::where('student_id', $studentInfoId)->firstOrFail();

            // Log the incoming request data
            Log::info('Incoming request data for Update:', $request->all());

            // Validate the incoming request
            $validatedData = $request->validated();

            // Update the StudentInfo object with the validated data
            $studentInfo->update($validatedData);

            // Return a success response
            return response()->json(['message' => 'Student information updated successfully'], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error updating student info', ['error' => $e->getMessage()]);

            // Return an error response
            return response()->json(['error' => 'Failed to update student information'], 500);
        }
    }

 
    /**
     * Display the specified resource. Mao ning tong sa Resource Folder
     */
    public function show(StudentInfo $studentInfo)
    {
        return new StudentResource($studentInfo);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $studentInfo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
