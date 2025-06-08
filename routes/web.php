<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AppSettingController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'admin'])->name('dashboard');

Route::middleware('auth', 'admin')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])->name('profile.photo.update');
    Route::delete('/profile/photo', [ProfileController::class, 'destroyPhoto'])->name('profile.photo.destroy');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/app-setting', [AppSettingController::class, 'show'])->name('app-setting.show');
    Route::post('/app-setting', [AppSettingController::class, 'update'])->name('app-setting.update');
    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('/offices', [OfficeController::class, 'index'])->name('offices.index');
    Route::post('/offices', [OfficeController::class, 'store'])->name('offices.store');
    Route::get('/divisions', [DivisionController::class, 'index'])->name('divisions.index');
});

Route::fallback(function () {
    return Inertia::render('Errors/404');
});

require __DIR__ . '/auth.php';