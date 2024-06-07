<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Http\Resources\SubjectResource;
use Illuminate\Support\Facades\Log;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SubjectResource::collection(
            Subject::query()->orderBy('student_id', 'desc')->get()
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
    public function store(StoreSubjectRequest $request)
    {
        try {
            Log::info('Received request to store subjects information', $request->all());

            $validatedData = $request->validated();
            Log::info('Validated data Subject:', $validatedData);

            $enrollmentInfo = new Subject($validatedData);

            $enrollmentInfo->save();

            return response()->json(['message' => 'subjects information stored successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Error storing subjects info', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to store subjects information'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        return new SubjectResource($subject);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        //
    }
}
