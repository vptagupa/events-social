<?php

use App\Http\Controllers\Admin\Frontend\Auth\ForgotPasswordController;
use App\Http\Controllers\Admin\Frontend\Auth\ResetPasswordController;
use App\Http\Controllers\Admin\Frontend\Auth\RegisterController;

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Administrator auth routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::controller(\App\Http\Controllers\Admin\Frontend\Auth\AuthController::class)->group(function () {
        Route::middleware('auth:admin')->group(function () {
            Route::prefix('change-password')->name('auth.')->group(function () {
                Route::get('/', 'changePassword')->name('change-password');
                Route::post('/', 'updatePassword')->name('change-password.update');
            });

        });

        Route::prefix('login')->name('login.')->group(function () {
            Route::get('/', 'login')->name('index');
            Route::post('/', 'auth')->name('auth');
        })->middleware('guest:admin');
    });


    Route::middleware('guest')->group(function () {
        Route::prefix('forgot-password')->name('forgot-password.')->group(function () {
            Route::post('/', [ForgotPasswordController::class, 'send'])->name('send');
        });
        Route::prefix('reset-password')->name('password.')->group(function () {
            Route::get('/{token}', [ResetPasswordController::class, 'index'])->name('reset');
            Route::post('/', [ResetPasswordController::class, 'update'])->name('update');
        });
        Route::post('/register', [RegisterController::class, 'store'])->name('register');
    });

});

// Organizer auth routes
Route::prefix('organizer')->name('organizer.')->group(function () {
    Route::controller(\App\Http\Controllers\Organizer\Frontend\Auth\AuthController::class)->group(function () {
        Route::middleware('auth:organizer')->group(function () {
            Route::prefix('change-password')->name('auth.')->group(function () {
                Route::get('/', 'changePassword')->name('change-password');
                Route::post('/', 'updatePassword')->name('change-password.update');
            });
        });

        Route::prefix('login')->name('login.')->group(function () {
            Route::get('/', 'login')->name('index');
            Route::post('/', 'auth')->name('auth');
        })->middleware('guest:organizer');
    });


    Route::middleware('guest:organizer')->group(function () {
        Route::controller(\App\Http\Controllers\Organizer\Frontend\Auth\ForgotPasswordController::class)->prefix('forgot-password')->name('forgot-password.')->group(function () {
            Route::post('/', 'send')->name('send');
        });
        Route::controller(\App\Http\Controllers\Organizer\Frontend\Auth\ResetPasswordController::class)->prefix('reset-password')->name('password.')->group(function () {
            Route::get('/{token}', 'index')->name('reset');
            Route::post('/', 'update')->name('update');
        });
        Route::post('/register', [\App\Http\Controllers\Organizer\Frontend\Auth\RegisterController::class, 'store'])->name('register');
    });

});

