<?php

namespace App\Http\Controllers;

use App\Models\Grades;
use App\Http\Requests\StoreGradesRequest;
use App\Http\Requests\UpdateGradesRequest;
use App\Http\Resources\GradeResource;
use App\Models\Grade;
use Illuminate\Support\Facades\Log;

class GradesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return GradeResource::collection(
            Grade::query()->orderBy('student_id', 'desc')->get()
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGradesRequest $request)
    {
        try {
            Log::info('Received request to store Grades information', $request->all());

            $validatedData = $request->validated();
            Log::info('Validated data Grades:', $validatedData);

            $enrollmentInfo = new Grade($validatedData);

            $enrollmentInfo->save();

            return response()->json(['message' => 'Grades information stored successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Error storing Grades info', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to store Grades information'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Grade $grades)
    {
        return new GradeResource($grades);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Grade $grades)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGradesRequest $request, Grade $grades)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grade $grades)
    {
        //
    }
}
