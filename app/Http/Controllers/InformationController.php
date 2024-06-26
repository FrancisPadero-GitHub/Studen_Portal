<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonalInfoRequest;
use App\Http\Requests\UpdatePersonalInfoRequest;
use App\Models\PersonalInfo;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\PersonalInfoResource;


// this controller handles the personal information table migration
class InformationController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PersonalInfoResource::collection(PersonalInfo::query()->orderBy('id', 'desc')->get());
    }


   
    public function fetchPersonalInfo($info_id)
    {
        
        $personal = PersonalInfo::where('info_id', $info_id)->first();

        if (!$personal) {
            return response()->json(['error' => 'Personal Information via ID not found'], 404);
        }

        return response()->json(['data' => $personal]);
        
    }

    
    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonalInfoRequest $request)
    {
        try {
            Log::info('Received request to store personal info', $request->all());

            $validatedData = $request->validated();
            
            $personalInfo = new PersonalInfo($validatedData);

            $personalInfo->save();

            return response()->json(['message' => 'Personal information stored successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Error storing personal info', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to store personal information'], 500);
        }
    }

    /**
     * Update the specified resource in storage via ID.
     */
    public function update(UpdatePersonalInfoRequest $request, $info_id)
    {
        try {
            // Find the PersonalInfo object by personal_id
            $personalInfo = PersonalInfo::where('info_id', $info_id)->firstOrFail();

            // Log the incoming request data
            Log::info('Incoming request data for Update:', $request->all());

            // Validate the incoming request
            $validatedData = $request->validated();

            // Update the PersonalInfo object with the validated data
            $personalInfo->update($validatedData);

            // Return a success response
            return response()->json(['message' => 'Personal information updated successfully'], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error updating personal info', ['error' => $e->getMessage()]);

            // Return an error response
            return response()->json(['error' => 'Failed to update personal information'], 500);
        }
    }

    public function destroy($info_id)
    {
        
        $personalInfo = PersonalInfo::where('info_id', $info_id)->first();

        if (!$personalInfo) {
            // If personalInfo with given admin_id doesn't exist, return a 404 error
            return response()->json(['error' => 'Personal Information not found'], 404);
        }

        // Delete the personalInfo
        $personalInfo->delete();

        // Return a success message
        return response()->json(['message' => 'Personal information deleted successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(PersonalInfo $info_id)
    {
        return new PersonalInfoResource($info_id);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $info_id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
}
