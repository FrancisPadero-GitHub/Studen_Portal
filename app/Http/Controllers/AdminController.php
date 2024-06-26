<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Http\Resources\AdminResource;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AdminResource::collection(Admin::query()->orderBy('id', 'desc')->get());
    }


    public function fetchAdminID($admin_id)
    {
        
        $admin = Admin::where('admin_id', $admin_id)->first();

        if (!$admin) {
            return response()->json(['error' => 'Admin Information via ID not found'], 404);
        }

        return response()->json(['data' => $admin]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdminRequest $request)
    {
        try {
            Log::info('Received request to store admin info', $request->all());

            $validatedData = $request->validated();
            
            $adminInfo = new Admin($validatedData);

            $adminInfo->save();

            return response()->json(['message' => 'Admin information stored successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Error storing admin info', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to store admin information'], 500);
        }
    }

    public function update(UpdateAdminRequest $request, Admin $admin_id)
    {
        try {
            
            $adminInfo = Admin::where('admin_id', $admin_id)->firstOrFail();

            
            Log::info('Incoming request data for admin update:', $request->all());

            
            $validatedData = $request->validated();

            
            $adminInfo->update($validatedData);

            
            return response()->json(['message' => 'Admin information updated successfully'], 200);
        } catch (\Exception $e) {
            
            Log::error('Error updating personal info', ['error' => $e->getMessage()]);

            
            return response()->json(['error' => 'Failed to update personal information'], 500);
        }
    }

    public function destroy($admin_id)
    {
        // Find the admin by admin_id
        $admin = Admin::where('admin_id', $admin_id)->first();

        if (!$admin) {
            // If admin with given admin_id doesn't exist, return a 404 error
            return response()->json(['error' => 'Admin not found'], 404);
        }

        // Delete the admin
        $admin->delete();

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
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    /**
     * Remove the specified resource from storage.
     */

}
