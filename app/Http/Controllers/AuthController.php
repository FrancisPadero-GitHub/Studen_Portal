<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // Login Validation Controller & Requests
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        if (!Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            Log::warning('Failed login attempt', ['email' => $data['email']]);

            return response()->json([
                'message' => 'The provided credentials are incorrect.',
                'error' => 'invalid_credentials'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }


    // Login Registration and Validation
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        // Create the user
        $user = User::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        // Generate a token for the user
        $token = $user->createToken('main')->plainTextToken;

        // Return the user data and token in the response
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->json(null, 204);
    }
}
