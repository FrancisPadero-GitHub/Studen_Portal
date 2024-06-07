<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\GradesController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\SubjectController;
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
    // Authenticator Login DB
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class);
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Student Informations API
Route::get('/students', [InformationController::class, 'index']);  // this is for showing the data without specifying the id
Route::get('/students/{studentInfo}', [InformationController::class, 'show']);
Route::apiResource('/students', InformationController::class);

// Student Enrollment API
Route::get('/enrollment', [EnrollmentController::class, 'index']);  // this is for showing the data without specifying the id
Route::get('/enrollment/{enrollment}', [EnrollmentController::class, 'show']);
Route::apiResource('/enrollment', EnrollmentController::class);

// Subjects Information API
Route::get('/subject', [SubjectController::class, 'index']);  // this is for showing the data without specifying the id
Route::get('/subject/{subject}', [SubjectController::class, 'show']);
Route::apiResource('/subject', SubjectController::class);

// Grades information API
Route::get('/grade', [GradesController::class, 'index']);  // this is for showing the data without specifying the id
Route::get('/grade/{grades}', [GradesController::class, 'show']);
Route::apiResource('/grade', GradesController::class);