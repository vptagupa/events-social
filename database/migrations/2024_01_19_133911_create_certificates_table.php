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
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events');
            $table->foreignId('workshop_id')->nullable()->constrained('workshops');
            $table->foreignId('file_id')->constrained('files');
            $table->string('name', 120)->nullable();
            $table->unsignedInteger('downloads')->default(0);
            $table->unsignedInteger('prints')->default(0);
            $table->unsignedInteger('sends')->default(0);
            $table->morphs('creator');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
