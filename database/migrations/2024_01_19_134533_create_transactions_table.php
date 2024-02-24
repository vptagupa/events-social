<?php

use App\Enums\PaymentStatus;
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
            $table->string('reference')->nullable();
            $table->boolean('is_gateway')->default(false);
            $table->foreignId('file_id')->nullable()->constrained('files');
            $table->nullableMorphs('transactor');
            $table->enum('status', array_map(fn($status) => $status->value, PaymentStatus::cases()))->length(75);
            $table->string('remarks', 150)->nullable();
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
