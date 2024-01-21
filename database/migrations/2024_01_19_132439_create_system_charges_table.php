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
        Schema::create('system_charges', function (Blueprint $table) {
            $table->id();
            $table->string('name', 25);
            $table->decimal('price');
            $table->boolean('is_active')->default(false);
            $table->foreignId('updated_admin_id')->constrained('admins');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('system_charges');
    }
};
