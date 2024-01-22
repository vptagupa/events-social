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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 25);
            $table->string('title', 125);
            $table->string('description', 250);
            $table->dateTime('expected_start_at');
            $table->dateTime('expected_end_at');
            $table->dateTime('actual_started_at')->nullable();
            $table->dateTime('actual_ended_at')->nullable();
            $table->boolean('is_offer_package')->default(false);
            $table->foreignId('banner_id')->nullable()->constrained('files');
            $table->foreignId('certificate_file_id')->nullable()->constrained('files');
            $table->foreignId('official_receipt_file_id')->nullable()->constrained('files');
            $table->foreignId('organizer_id')->constrained('organizers');
            $table->boolean('active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
