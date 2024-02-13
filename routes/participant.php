<?php

use App\Http\Controllers\Participant\ParticipantController;
use Illuminate\Support\Facades\Route;



Route::controller(ParticipantController::class)->group(function () {
    Route::name('participant.')->prefix('participant/{workshop}')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/registrationForm', 'registrationForm')->name('registrationForm');
    });
});

