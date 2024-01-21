<?php

namespace App\Providers;

use App\Models\Admin;
use App\Models\Organizer;
use App\Models\Participant;
use Illuminate\Support\Facades\Route;
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
        Route::model('organizer', Organizer::class);
        Route::model('participant', Participant::class);
    }
}
