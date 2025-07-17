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
                $table->integer('category_id')->index();
                $table->integer('service_category_id')->index();
                $table->string('alias')->unique();
                $table->dateTime('start_time')->nullable();
                $table->dateTime('stop_time')->nullable();
                $table->tinyInteger('is_published')->default(0);
                $table->tinyInteger('is_active')->default(0);
                $table->unsignedInteger('views')->default(0);
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
