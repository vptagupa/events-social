<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::get('/users', [DashboardController::class, 'index'])->name('users');
    Route::get('/config', [DashboardController::class, 'index'])->name('config');
    Route::get('/audits', [DashboardController::class, 'index'])->name('audits');

    Route::name('setup.')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('index');
    });
});