<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\RoleController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\OfficeController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/roles', [RoleController::class, 'index']);
Route::get('/employees', [EmployeeController::class, 'index']);
Route::post('/employees', [EmployeeController::class, 'store']);
Route::put('/employees/{id}', [EmployeeController::class, 'update']);
Route::post('/send-password-link', [RegisteredUserController::class, 'sendPasswordLink']);
Route::patch('/employees/{id}/block', [EmployeeController::class, 'toggleBlock']);
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);
Route::get('/offices', [OfficeController::class, 'index']);
Route::post('/offices', [OfficeController::class, 'store']);
Route::put('/offices/{id}', [OfficeController::class, 'update']);
