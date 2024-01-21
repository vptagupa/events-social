<?php

namespace App\Providers;

use App\Models\Organizer;
use App\Models\Participant;
use Illuminate\Support\Facades\Route;
use App\Models\Admin;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::model('admin', Admin::class);
        Route::model('organizer', Participant::class);
        Route::model('participant', Organizer::class);
    }
}
