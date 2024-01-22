<?php

use App\Http\Controllers\Organizer\EventsController;
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
    });
    Route::resource('events', EventsController::class)->except(['create', 'edit', 'show']);
});

