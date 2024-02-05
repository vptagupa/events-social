<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('participant_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events');
            $table->foreignId('participant_id')->constrained('participants');
            $table->string('uid', 15);
            $table->foreignId('offer_id')->constrained('event_offers');
            $table->foreignId('registration_form_id')->constrained('event_registration_forms');
            $table->dateTime('notified_at');
            $table->dateTime('confirmed_at')->nullable();
            $table->dateTime('validated_at')->nullable();
            $table->dateTime('payment_at')->nullable();
            $table->dateTime('confirmed_payment_at')->nullable();
            $table->dateTime('failed_payment_at')->nullable();
            $table->dateTime('closed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participant_events');
    }
};
