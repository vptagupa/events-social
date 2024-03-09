<?php

use App\Http\Controllers\Admin\Backend\DashboardController;
use App\Http\Controllers\Admin\Backend\SystemFeeController;
use App\Http\Controllers\Organizer\CertificatesController;
use App\Http\Controllers\Organizer\EventSettingController;
use App\Http\Controllers\Organizer\FeesController;
use App\Http\Controllers\Organizer\FeeController;
use App\Http\Controllers\Organizer\EventsController;
use App\Http\Controllers\Organizer\OffersController;
use App\Http\Controllers\Organizer\OrganizerController;
use App\Http\Controllers\Organizer\ParticipantsController;
use App\Http\Controllers\Organizer\RegistrationFormController;
use App\Http\Controllers\Organizer\VerifierController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Participant\ParticipantController;
use App\Http\Controllers\Participant\TransactionsController;

use App\Http\Middleware\RedirectIfTemporaryPassword;

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

Route::middleware(['auth:organizer,admin', RedirectIfTemporaryPassword::class])->name('organizer.')->prefix('organizer')->group(function () {
    Route::controller(EventsController::class)->prefix('events')->name('events.')->group(function () {
        Route::get('/', 'any')->name('any');
        Route::post('/list', 'anyList')->name('anyList');

        Route::prefix('{event}')->group(function () {
            Route::controller(RegistrationFormController::class)->name('registration-form.')->prefix('registration-form')->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/', 'store')->name('store');
                Route::delete('/', 'destroy')->name('destroy');
            });
            Route::controller(OffersController::class)->name('pricing.')->prefix('pricing')->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/store', 'store')->name('store');
                Route::post('/payment', 'payment')->name('payment');
                Route::delete('/', 'destroy')->name('destroy');
            });
            Route::controller(EventSettingController::class)->name('settings.')->prefix('settings')->group(function () {
                Route::post('/', 'list')->name('list');
                Route::patch('{setting}/', 'update')->name('update');
            });
            Route::controller(FeeController::class)->name('fees.')->prefix('fees')->group(function () {
                Route::post('/', 'list')->name('list');
                Route::patch('{fee}/', 'update')->name('update');
            });
            Route::controller(SystemFeeController::class)->name('sysfees.')->prefix('sysfees')->group(function () {
                Route::post('/', 'list')->name('list');
                Route::patch('{fee}/', 'update')->name('update');
            });
            Route::controller(ParticipantsController::class)->name('participants.')->prefix('participants')->group(function () {
                Route::post('/list', 'list')->name('list');
                Route::post('/invite', 'invite')->name('invite');
                Route::post('{participant}/upload-proof-of-payment', 'uploadProofOfPayment')->name('upp');

                // Verifier
                Route::controller(VerifierController::class)->prefix('verifier')->name('verifier.')->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('/{workshop:uuid}/verify', 'verify')->name('verify');
                    Route::post('/{workshop}', 'store')->name('store');
                });
            });
            Route::resource('participants', ParticipantsController::class)->except(['create', 'edit']);
            Route::name('export.')->prefix('export')->group(function () {
                Route::post('/', 'export')->name('create');
                Route::post('/list', 'exportList')->name('list');
            });
            Route::controller(CertificatesController::class)->name('certificates.')->prefix('certificates')->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/list', 'list')->name('list');
                Route::patch('/updateName/{certificate}', 'updateName')->name('update-name');
                Route::post('/print-select', 'printSelect')->name('print-select');
                Route::get('/printtable', 'printtable')->name('printtable');
                Route::post('/download-select', 'downloadSelect')->name('download-select');
                Route::get('/download', 'download')->name('download');
                Route::post('/send-select', 'sendSelect')->name('send-select');
            });
            Route::resource('certificates', CertificatesController::class)->except(['edit', 'show', 'create']);
            Route::get('statistics', 'statistics')->name('statistics');
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

    // Participants routes
    Route::controller(ParticipantController::class)->group(function () {
        Route::name('participant.')->prefix('participant/{workshop}')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'update')->name('update');
            Route::post('/transactions', 'transactions')->name('transactions');
            Route::post('/registrationForm', 'registrationForm')->name('registrationForm');
            Route::patch('/cancelled', 'cancelled')->name('cancelled');
            Route::patch('/confirmed', 'confirmed')->name('confirmed');
            Route::get('/resend-invite', 'resendInvitation')->name('resend-invite');
            Route::get('/resend-payment', 'resendPaymentForm')->name('resend-payment');
        });
    });

    Route::controller(OrganizerController::class)->group(function () {
        Route::get('/logout', 'logout')->name('logout');
    });

    Route::name('participants.')->prefix('participants')->group(function () {
        // Payment routes
        Route::controller(TransactionsController::class)->name('payments.')->prefix('payments')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/list', 'list')->name('list');
            Route::prefix('{transaction}')->group(function () {
                Route::get('/info', 'info')->name('info');
                Route::post('/confirmed', 'confirmed')->name('confirmed');
                Route::post('/rejected', 'rejected')->name('rejected');
                Route::post('/cancelled', 'cancelled')->name('cancelled');
                Route::post('/partial', 'partial')->name('partial');
            });
        });
    });

    Route::get('/', [DashboardController::class, 'index'])->name('index');
});

