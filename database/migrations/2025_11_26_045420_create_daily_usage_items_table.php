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

            // relasi ke daily_usages
            $table->foreignId('daily_usage_id')
                ->constrained('daily_usages')
                ->onDelete('cascade');

            // relasi ke items
            $table->foreignId('item_id')
                ->constrained('items')
                ->onDelete('cascade');

            // kolom-kolom nilai
            $table->integer('quantity_used');
            $table->decimal('unit_price', 12, 2);
            $table->decimal('total_price', 12, 2);

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
