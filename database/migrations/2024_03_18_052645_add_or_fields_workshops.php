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
        Schema::table('workshops', function (Blueprint $table) {
            $table->decimal('or_amount')->nullable();
            $table->string('or_bank')->nullable();
            $table->string('or_check_no')->nullable();
            $table->datetime('or_check_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('workshops', function (Blueprint $table) {
            $table->dropColumn(['or_amount', 'or_bank', 'or_check_no', 'or_check_date']);
        });
    }
};
