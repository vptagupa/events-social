<?php

use App\Http\Controllers\Admin\UserController;
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

// Route::name('admin.')->group(function () {
//     Route::get('/', [DashboardController::class, 'index'])->name('index');
//     Route::controller(UserController::class)->name('user.')->prefix('user')->group(function () {
//         Route::get('/profile', 'profile')->name('profile');
//         Route::patch('/update-name', 'updateName')->name('update_name');
//         Route::patch('/update-password', 'updatePassword')->name('update_password');
//     });
//     Route::get('/users', [DashboardController::class, 'index'])->name('users');
//     Route::get('/config', [DashboardController::class, 'index'])->name('config');
//     Route::get('/audits', [DashboardController::class, 'index'])->name('audits');

//     Route::name('setup.')->prefix('setup')->group(function () {
//         Route::get('/', [DashboardController::class, 'index'])->name('index');
//     });
// });

