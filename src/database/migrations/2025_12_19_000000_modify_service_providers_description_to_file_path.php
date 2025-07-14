<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('service_providers', function (Blueprint $table) {
            // Change description column to store file path instead of text content
            $table->string('description')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_providers', function (Blueprint $table) {
            // Revert back to text column
            $table->text('description')->change();
        });
    }
}; 