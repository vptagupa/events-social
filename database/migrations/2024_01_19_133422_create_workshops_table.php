<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\PaymentStatus;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('workshops', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('code', 15);
            $table->foreignId('event_id')->constrained('events');
            $table->foreignId('participant_id')->constrained('participants');
            $table->foreignId('registration_form_id')->nullable()->constrained('registration_forms');
            $table->foreignId('offer_id')->nullable()->constrained('event_offers');
            $table->enum(
                'payment_status',
                array_map(
                    fn($case) => $case->value,
                    PaymentStatus::cases()
                )
            )->length(35)->nullable();
            $table->dateTime('notified_at')->nullable();
            $table->dateTime('submitted_at')->nullable();
            $table->dateTime('confirmed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workshops');
    }
};
