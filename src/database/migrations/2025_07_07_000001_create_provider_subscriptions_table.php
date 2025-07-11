<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('provider_subscriptions')) {
            Schema::create('provider_subscriptions', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('service_provider_id')->index();
                $table->unsignedBigInteger('subscription_plan_id')->index();
                $table->dateTime('start_date');
                $table->dateTime('end_date');
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('provider_subscriptions');
    }
}; 