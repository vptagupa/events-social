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
            $table->uuid();
            $table->string('slug', 150);
            $table->string('title', 120);
            $table->string('description', 400);
            $table->string('place', 250);
            $table->string('address', 400);
            $table->string('map', 400)->nullable();
            $table->decimal('price')->nullable();
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
            $table->dateTime('published_at')->nullable();
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
