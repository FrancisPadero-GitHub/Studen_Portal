<?php

namespace App\Http\Controllers;

use App\Models\Instructor;
use App\Http\Requests\StoreInstructorRequest;
use App\Http\Requests\UpdateInstructorRequest;
use App\Http\Resources\InstructorResource;
use Illuminate\Support\Facades\Log;

class InstructorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return InstructorResource::collection(Instructor::query()->orderBy('id', 'desc')->get());
    }


    public function fetchAdminID($instructor_id)
    {

        $instructor = Instructor::where('instructor_id', $instructor_id)->first();

        if (!$instructor) {
            return response()->json(['error' => 'Instructor Information via ID not found'], 404);
        }

        return response()->json(['data' => $instructor]);
    }

    public function store(StoreInstructorRequest $request)
    {
        try {
            Log::info('Received request to store instructor info', $request->all());

            $validatedData = $request->validated();

            $instructorInfo = new Instructor($validatedData);

            $instructorInfo->save();

            return response()->json(['message' => 'Instructor information stored successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Error storing instructor info', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to store instructor information'], 500);
        }
    }

    public function update(UpdateInstructorRequest $request, Instructor $instructor_id)
    {
        try {

            $instructorInfo = Instructor::where('instructor_id', $instructor_id)->firstOrFail();


            Log::info('Incoming request data for instructor update:', $request->all());


            $validatedData = $request->validated();


            $instructorInfo->update($validatedData);


            return response()->json(['message' => 'Instructor information updated successfully'], 200);
        } catch (\Exception $e) {

            Log::error('Error updating personal info', ['error' => $e->getMessage()]);


            return response()->json(['error' => 'Failed to update personal information'], 500);
        }
    }

    public function destroy($instructor_id)
    {
        // Find the admin by instructor_id
        $instructor = Instructor::where('instructor_id', $instructor_id)->first();

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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }



    /**
     * Display the specified resource.
     */
    public function show(Instructor $instructor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Instructor $instructor)
    {
        //
    }



    /**
     * Remove the specified resource from storage.
     */
   
}
