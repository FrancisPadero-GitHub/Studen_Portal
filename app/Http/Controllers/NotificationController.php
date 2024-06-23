<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotificationRequest;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return NotificationResource::collection(Notification::query()->orderBy('id', 'desc')->get());
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
    public function store(NotificationRequest $request)
    {
        try {
            Log::info('Received request to store notification info', $request->all());

            $validatedData = $request->validated();

            $studentInfo = new Notification($validatedData);

            $studentInfo->save();

            return response()->json(['message' => 'notification stored successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Error storing notification info', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to notification information'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        return new NotificationResource($notification);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(NotificationRequest $request, $notification)
    {
        try {
            // Find the StudentInfo object by ID
            $studentInfo = Notification::findOrFail($notification);

            // Log the incoming request data
            Log::info('Incoming request data for Update:', $request->all());

            // Validate the incoming request
            $validatedData = $request->validated();

            // Update the StudentInfo object with the validated data
            $studentInfo->update($validatedData);

            // Return a success response
            return response()->json(['message' => ' notification updated successfully'], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error updating notification info', ['error' => $e->getMessage()]);

            // Return an error response
            return response()->json(['error' => 'Failed to update notification information'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        // Delete the notification
        $notification->delete();

        // Optionally, you can return a response indicating success
        return response()->json(['message' => 'Notification deleted successfully']);
    }
}
