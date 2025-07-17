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
        if (!Schema::hasTable('certifications')) {
            Schema::create('certifications', function (Blueprint $table) {
                $table->id();
                $table->string('name')->nullable();
                $table->text('description')->nullable();
                $table->unsignedBigInteger('service_provider_id');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certifications');
    }
};
