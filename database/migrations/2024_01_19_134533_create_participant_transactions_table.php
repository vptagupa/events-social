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
        Schema::create('participant_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participant_event_id')->constrained('events');
            $table->decimal('expected_amount');
            $table->decimal('actual_paid_amount');
            $table->dateTime('confirmed_at')->nullable();
            $table->foreignId('confirmed_admin_id')->nullable()->constrained('admins');
            $table->dateTime('failed_at')->nullable();
            $table->foreignId('proof_file_id')->nullable()->constrained('files');
            $table->boolean('is_gateway')->default(false);
            $table->string('reference_no')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participant_transactions');
    }
};
