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
        if (!Schema::hasTable('service_providers')) {
            Schema::create('service_providers', function (Blueprint $table) {
                $table->id();
                $table->integer('user_id')->index();
                $table->string('business_name');
                $table->text('description');
                $table->integer('category_id')->index();
                $table->integer('service_category_id')->index();
                $table->dateTime('start_time')->nullable();
                $table->dateTime('stop_time')->nullable();
                $table->string('alias')->unique();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_providers');
    }
};
