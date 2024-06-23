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
    // Now this is being used for the superuser default account creation and admin (student login creation)
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        User::create([
            'student_id' => $data['student_id'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'account' => $data['account']
        ]);

        // Generate a token for the user PS: Deprecated due to adding a super user account
        // $token = $user->createToken('main')->plainTextToken;

        // Return the user data and token in the response
        // return response()->json([
        //     'user' => $user,
        //     'token' => $token
        // ], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->json(null, 204);
    }
}
