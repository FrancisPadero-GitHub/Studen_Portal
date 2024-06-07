<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Http\Requests\StoreEnrollmentRequest;
use App\Http\Requests\UpdateEnrollmentRequest;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\EnrollmentResource;


class EnrollmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EnrollmentResource::collection(Enrollment::query()->orderBy('enrollment_id', 'desc')->get());
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
    public function store(StoreEnrollmentRequest $request)
    {
        try {
            Log::info('Received request to store enrollment information', $request->all());

            $validatedData = $request->validated();
            Log::info('Validated data:', $validatedData);

            $enrollmentInfo = new Enrollment($validatedData);

            $enrollmentInfo->save();

            return response()->json(['message' => 'Enrollment information stored successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Error storing Enrollment info', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to store enrollment information'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Enrollment $enrollment)
    {
        return new EnrollmentResource($enrollment);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Enrollment $enrollment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnrollmentRequest $request,  $enrollment)
    {
        try {
            // Find the StudentInfo object by ID
            $enrollmentInfo = Enrollment::findOrFail($enrollment);

            // Log the incoming request data
            Log::info('Incoming request data:', $request->all());

            // Validate the incoming request
            $validatedData = $request->validated();

            // Update the StudentInfo object with the validated data
            $enrollmentInfo->update($validatedData);

            // Return a success response
            return response()->json(['message' => 'Enrollment information updated successfully'], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error updating Enrollment info', ['error' => $e->getMessage()]);

            // Return an error response
            return response()->json(['error' => 'Failed to update Enrollment information'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enrollment $enrollment)
    {
        //
    }
}
