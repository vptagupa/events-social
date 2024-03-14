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
        Schema::table('events', function (Blueprint $table) {
            $table->foreignId('official_receipt_signatory_signature_id')->nullable()->constrained('files');
            $table->string('official_receipt_signatory', 75)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropConstrainedForeignId('official_receipt_signatory_signature_id');
            $table->dropColumn([
                'official_receipt_signatory'
            ]);
        });
    }
};
