<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/* 
This code defines a group of routes in a Laravel application that are
 protected by the Sanctum authentication middleware, meaning that the
  user must be authenticated to access these routes. 
*/
// Login API
Route::middleware('auth:sanctum')->group(function () {
    // Student Login DB
    Route::get('/students', [InformationController::class, 'index']);
    Route::get('/students/{studentInfo}', [InformationController::class, 'show']);

    // Authenticator Login DB
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class);
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Student Informations
Route::post('store', [InformationController::class, 'store']);
