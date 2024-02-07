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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('code')->nullable();
            $table->foreignId('workshop_id')->constrained('workshops');
            $table->decimal('expected_price');
            $table->decimal('actual_paid_amount');
            $table->decimal('charges');
            $table->decimal('price');
            $table->decimal('tax_amount');
            $table->string('tax', 5);
            $table->dateTime('paid_at')->nullable();
            $table->boolean('is_gateway')->default(false);
            $table->dateTime('failed_at')->nullable();
            $table->string('failed_reason')->nullable();
            $table->foreignId('file_id')->nullable()->constrained('files');
            $table->dateTime('confirmed_at')->nullable();
            $table->foreignId('confirmed_admin_id')->nullable()->constrained('admins');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
