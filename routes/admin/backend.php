<?php

use App\Http\Controllers\Admin\Backend\UsersController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Backend\UserController;
use App\Http\Controllers\Admin\Backend\DashboardController;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::name('admin.')->prefix('admin')->group(function () {
    Route::name('backend.')->group(function () {

        Route::controller(DashboardController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/config', 'index')->name('config');
            Route::get('/audits', 'index')->name('audits');
        });
        Route::controller(UserController::class)->group(function () {
            Route::get('/logout', 'logout')->name('logout');
            Route::prefix('user')->name('user.')->group(function () {
                Route::get('/profile', 'profile')->name('profile');
                Route::patch('/update-name', 'updateName')->name('update_name');
                Route::patch('/update-password', 'updatePassword')->name('update_password');
            });
        });
        Route::name('setup.')->prefix('setup')->group(function () {
            Route::get('/', [DashboardController::class, 'index'])->name('index');
        });
        Route::controller(UsersController::class)->prefix('users')->name('users.')->group(function () {
            Route::post('/list', 'list')->name('list');
            Route::patch('/reset-password/{admin}', 'resetPassword')->name('reset-password');
        });
        Route::resource('users', UsersController::class)->parameters([
            'users' => 'admin'
        ])->except(['create', 'edit', 'show']);
    });
});

