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
        if (!Schema::hasTable('contacts')) {
            Schema::create('contacts', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('model_id'); // Changed from service_provider_id to model_id for flexibility
                $table->string('model_type'); // To support polymorphic relations if needed
                $table->string('website')->nullable();
                $table->string('phone')->nullable();
                $table->string('address')->nullable();
                $table->string('facebook')->nullable();
                $table->string('instagram')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
