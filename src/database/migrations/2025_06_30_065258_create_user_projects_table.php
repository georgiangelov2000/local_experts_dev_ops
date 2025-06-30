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
        if (!Schema::hasTable('user_projects')) {
            Schema::create('user_projects', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('service_provider_id')->index();
                $table->string('project_name');
                $table->text('description');
                $table->tinyInteger('status');
                $table->timestamp('date_start');
                $table->timestamp('date_end');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_projects');
    }
};
