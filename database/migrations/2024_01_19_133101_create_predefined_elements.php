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
        Schema::create('predefined_elements', function (Blueprint $table) {
            $table->id();
            $table->string('created_user_type');
            $table->unsignedBigInteger('created_user_id');
            $table->string('type', 15);
            $table->json('schema');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('predefined_elements');
    }
};
