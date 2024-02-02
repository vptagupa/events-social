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
        Schema::create('organizer_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organizer_id')->constrained('organizers');
            $table->string('name', 25);
            $table->decimal('price');
            $table->boolean('active')->default(false);
            $table->foreignId('updated_organizer_id')->nullable()->constrained('organizers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizer_fees');
    }
};
