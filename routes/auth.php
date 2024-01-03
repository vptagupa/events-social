<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;

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

Route::controller(AuthController::class)->group(function () {
    Route::prefix('change-password')->name('auth.')->group(function () {
        Route::get('/', 'changePassword')->name('change-password');
        Route::post('/', 'updatePassword')->name('change-password.update');
    })->middleware('auth');
    Route::prefix('login')->name('login.')->group(function () {
        Route::get('/', 'login')->name('index');
        Route::post('/', 'auth')->name('auth');
    })->middleware('guest');
});

Route::prefix('forgot-password')->name('forgot-password.')->group(function () {
    Route::post('/', [ForgotPasswordController::class, 'send'])->name('send');
})->middleware('guest');

Route::prefix('reset-password')->name('password.')->group(function () {
    Route::get('/{token}', [ResetPasswordController::class, 'index'])->name('reset');
    Route::post('/', [ResetPasswordController::class, 'update'])->name('update');
})->middleware('guest');
