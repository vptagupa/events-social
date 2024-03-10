<?php

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
        Route::controller(\App\Http\Controllers\Admin\Frontend\Auth\ForgotPasswordController::class)->prefix('forgot-password')->name('forgot-password.')->group(function () {
            Route::post('/', 'send')->name('send');
        });

        Route::controller(\App\Http\Controllers\Admin\Frontend\Auth\ResetPasswordController::class)->prefix('reset-password')->name('password.')->group(function () {
            Route::get('/{token}', 'index')->name('reset');
            Route::post('/', 'update')->name('update');
        });
        Route::post('/register', [\App\Http\Controllers\Admin\Frontend\Auth\RegisterController::class, 'store'])->name('register');
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

// Global auth routes
Route::controller(\App\Http\Controllers\Frontend\Auth\AuthController::class)->group(function () {
    Route::prefix('login')->name('login.')->group(function () {
        Route::get('/', 'login')->name('index');
        Route::post('/', 'attempt')->name('attempt');
    })->middleware('guest');

    Route::controller(\App\Http\Controllers\Frontend\Auth\ForgotPasswordController::class)->prefix('forgot-password')->name('forgot-password.')->group(function () {
        Route::post('/', 'send')->name('send');
    });
    Route::post('/register', [\App\Http\Controllers\Frontend\Auth\RegisterController::class, 'store'])->name('register');
    Route::get('redirect', 'redirect')->name('redirect');
});

