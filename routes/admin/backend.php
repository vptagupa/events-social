<?php

use App\Http\Controllers\Admin\Backend\OrganizersController;
use App\Http\Controllers\Admin\Backend\SystemFeesController;
use App\Http\Controllers\Admin\Backend\UsersController;
use App\Http\Controllers\Admin\Backend\UserController;
use App\Http\Controllers\Admin\Backend\DashboardController;
use App\Http\Controllers\Admin\Backend\ParticipantsController;

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RedirectIfTemporaryPassword;

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

Route::middleware(['auth:admin', RedirectIfTemporaryPassword::class])->name('admin.')->prefix('admin')->group(function () {
    Route::name('backend.')->group(function () {
        Route::controller(DashboardController::class)->group(function () {
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

        Route::controller(UsersController::class)->prefix('users')->name('users.')->group(function () {
            Route::post('/list', 'list')->name('list');
            Route::patch('/reset-password/{admin}', 'resetPassword')->name('reset-password');
            Route::patch('/active/{admin}', 'activate')->name('activate');
        });
        Route::resource('users', UsersController::class)->parameters([
            'users' => 'admin'
        ])->except(['create', 'edit', 'show']);

        Route::controller(OrganizersController::class)->prefix('organizers')->name('organizers.')->group(function () {
            Route::post('/list', 'list')->name('list');
            Route::patch('/reset-password/{organizer}', 'resetPassword')->name('reset-password');
            Route::patch('/active/{organizer}', 'activate')->name('activate');
        });

        Route::resource('organizers', OrganizersController::class)->except(['create', 'edit', 'show']);

        Route::name('setup.')->prefix('setup')->group(function () {
            Route::controller(SystemFeesController::class)->prefix('fees')->name('fees.')->group(function () {
                Route::post('/list', 'list')->name('list');
                Route::patch('/active/{fee}', 'activate')->name('activate');
            });
            Route::resource('fees', SystemFeesController::class)->except(['create', 'edit', 'show']);
        });

        Route::controller(ParticipantsController::class)->prefix('participants')->name('participants.')->group(function () {
            Route::post('/list', 'list')->name('list');
        });
    });
});

Route::middleware(['auth:admin,organizer', RedirectIfTemporaryPassword::class])->name('admin.')->prefix('admin')->group(function () {
    Route::name('backend.')->group(function () {
        Route::controller(DashboardController::class)->group(function () {
            Route::get('/', 'index')->name('index');
        });
        Route::resource('participants', ParticipantsController::class)->except(['create', 'edit', 'show']);
    });
});
