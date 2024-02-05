<?php

use App\Http\Controllers\Admin\Backend\SystemFeeController;
use App\Http\Controllers\Organizer\EventSettingController;
use App\Http\Controllers\Organizer\FeesController;
use App\Http\Controllers\Organizer\FeeController;
use App\Http\Controllers\Organizer\EventsController;
use App\Http\Controllers\Organizer\OffersController;
use App\Http\Controllers\Organizer\RegistrationFormController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Organizer Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::name('organizer.')->prefix('organizer')->group(function () {
    Route::controller(EventsController::class)->prefix('events')->name('events.')->group(function () {
        Route::get('/', 'any')->name('any');
        Route::post('/list', 'anyList')->name('anyList');
        Route::controller(RegistrationFormController::class)->name('registration-form.')->prefix('{event}/registration-form')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::delete('/', 'destroy')->name('destroy');
        });
        Route::controller(OffersController::class)->name('pricing.')->prefix('{event}/pricing')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/store', 'store')->name('store');
            Route::post('/payment', 'payment')->name('payment');
            Route::delete('/', 'destroy')->name('destroy');
        });

        Route::controller(EventSettingController::class)->name('settings.')->prefix('{event}/settings')->group(function () {
            Route::post('/', 'list')->name('list');
            Route::patch('{setting}/', 'update')->name('update');
        });
        Route::controller(FeeController::class)->name('fees.')->prefix('{event}/fees')->group(function () {
            Route::post('/', 'list')->name('list');
            Route::patch('{fee}/', 'update')->name('update');
        });
        Route::controller(SystemFeeController::class)->name('sysfees.')->prefix('{event}/sysfees')->group(function () {
            Route::post('/', 'list')->name('list');
            Route::patch('{fee}/', 'update')->name('update');
        });
    });
    Route::controller(EventsController::class)->prefix('{organizer}/events')->name('events.')->group(function () {
        Route::post('/list', 'list')->name('list');
        Route::patch('/active/{event}', 'activate')->name('activate');
        Route::patch('/offer/{event}', 'offer')->name('offer');
    });
    Route::resource('{organizer}/events', EventsController::class)->except(['create']);
    Route::controller(FeesController::class)->prefix('fees')->name('fees.')->group(function () {
        Route::get('/', 'any')->name('any');
        Route::post('/list', 'anyList')->name('anyList');
    });
    Route::controller(FeesController::class)->prefix('{organizer}/fees')->name('fees.')->group(function () {
        Route::post('/list', 'list')->name('list');
        Route::patch('/{fee}/active', 'activate')->name('activate');
    });
    Route::resource('{organizer}/fees', FeesController::class)->except(['create', 'edit', 'show']);
});

