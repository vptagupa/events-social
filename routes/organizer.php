<?php

use App\Http\Controllers\Organizer\EventsController;
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
        Route::post('/list', 'list')->name('list');
        Route::patch('/active/{event}', 'activate')->name('activate');
        Route::controller(RegistrationFormController::class)->name('registration-form.')->prefix('{event}/registration-form')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::delete('/', 'destroy')->name('destroy');
        });
    });
    Route::resource('events', EventsController::class)->except(['create']);
});

