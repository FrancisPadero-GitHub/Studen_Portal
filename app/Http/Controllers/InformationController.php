<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudInfoRequest;
use App\Models\StudentInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\StudentResource;

class InformationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return StudentResource::collection(
            StudentInfo::query()->orderBy('id', 'desc')->get()
        );
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
     * Display the specified resource.
     */
    public function show(StudentInfo $studentInfo)
    {
        return new StudentResource($studentInfo);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
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
