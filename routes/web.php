<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Frontend\ParticipantController;
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

Route::controller(ParticipantController::class)->group(function () {
    Route::name('invitation.')->prefix('invitation')->group(function () {
        Route::get('/accepted/{workshop:uuid}', 'accepted')->name('accepted');
    });

    Route::name('registration.')->prefix('registration/{workshop:uuid}')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'register')->name('register');
        Route::post('/form', 'form')->name('store');
        Route::get('/accept', 'accept')->name('accept');
        Route::post('/accept', 'accepted')->name('accepted');
        Route::get('/offer', 'offer')->name('offer');
        Route::post('/offer/{offer}', 'offerSelect')->name('offerSelect');
        Route::get('/pay', 'pay')->name('pay');
        Route::post('/pay', 'payCreate')->name('payCreate');
        Route::get('/status', 'status')->name('status');
        Route::get('/confirmed', 'confirmed')->name('confirmed');
        Route::get('/price-breakdown', 'priceBreakdown')->name('priceBreakdown');
    });

    Route::name('event.')->prefix('event')->group(function () {
        Route::get('/{event:slug}', 'index')->name('index');
    });

});

