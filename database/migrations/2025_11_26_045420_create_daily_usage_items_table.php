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
        Schema::create('daily_usage_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daily_usage_id')->constrained('daily_usages')->onDelete('cascade');
            $table->foreignId('item_id')->constrained('items')->onDelete('cascade');
            $table->integer('quantity_used');
            $table->decimal('unit_price', 12, 2)->after('quantity_used');
            $table->decimal('total_price', 12, 2)->after('unit_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_usage_items');
    }
};
