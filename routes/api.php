<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\GradesController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudentController;
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
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
});

// Security issues risky move
Route::apiResource('/users', UserController::class);

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Student Informations API
Route::get('/personalInfo', [InformationController::class, 'index']);  // this is for showing the data without specifying the id
Route::get('/personalInfo/{info_id}', [InformationController::class, 'show']);
Route::put('/personalInfo/update/{info_id}', [InformationController::class, 'update']);
Route::get('/personalInfo/fetch/{info_id}', [InformationController::class, 'fetchPersonalInfo']);
Route::apiResource('/personalInfo', InformationController::class);


// Student Enrollment API
Route::get('/enrollment', [EnrollmentController::class, 'index']);  // this is for showing the data without specifying the id
Route::get('/enrollment/{enrollment}', [EnrollmentController::class, 'show']);
Route::apiResource('/enrollment', EnrollmentController::class);

Route::get('/enrollment/by-student-id/{student_id}', [EnrollmentController::class, 'fetch_by_Id']);

// Subjects Information API
Route::get('/subject', [SubjectController::class, 'index']);  // this is for showing the data without specifying the id
Route::get('/subject/{subject}', [SubjectController::class, 'show']);
Route::apiResource('/subject', SubjectController::class);

Route::get('/subject/by-student-id/{student_id}', [SubjectController::class, 'fetch_by_Id']);

// Grades information API
Route::get('/grade', [GradesController::class, 'index']);  // this is for showing the data without specifying the id
Route::get('/grade/{grades}', [GradesController::class, 'show']);
Route::apiResource('/grade', GradesController::class);

Route::get('/grade/by-student-id/{student_id}', [GradesController::class, 'fetch_by_Id']);

// Notification information API
Route::get('/notification', [NotificationController::class, 'index']);  // this is for showing the data without specifying the id
Route::apiResource('/notification', NotificationController::class);

// Admin Table
Route::get('/admin', [AdminController::class, 'index']);  // this is for showing the data without specifying the id
Route::get('/admin/{admin_id}', [AdminController::class, 'show']);
Route::put('/admin/update/{admin_id}', [AdminController::class, 'update']);
Route::get('/admin/fetch/{admin_id}', [AdminController::class, 'fetchAdminID']);
Route::apiResource('/admin', AdminController::class);

// Instructor Table
Route::get('/instructor', [InstructorController::class, 'index']);  // this is for showing the data without specifying the id
Route::get('/instructor/{instructor_id}', [InstructorController::class, 'show']);
Route::put('/instructor/update/{instructor_id}', [InstructorController::class, 'update']);
Route::get('/instructor/fetch/{instructor_id}', [InstructorController::class, 'fetchInstructorID']);
Route::apiResource('/instructor', InstructorController::class);

// Schedule Table
Route::get('/schedule', [ScheduleController::class, 'index']);  // this is for showing the data without specifying the id
Route::get('/schedule/{id}', [ScheduleController::class, 'show']);
Route::put('/schedule/update/{id}', [ScheduleController::class, 'update']);
Route::get('/schedule/fetch/{id}', [ScheduleController::class, 'scheduleID']);
Route::apiResource('/schedule', ScheduleController::class);

// Student Table
Route::apiResource('/student', StudentController::class);