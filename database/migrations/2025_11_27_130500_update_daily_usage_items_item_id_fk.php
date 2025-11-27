<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('daily_usage_items', function (Blueprint $table) {
            // Drop FK to prevent cascading deletes when items are removed
            try {
                $table->dropForeign(['item_id']);
            } catch (\Throwable $e) {
                // Constraint may already be dropped or named differently; ignore safely
            }
            // If you prefer keeping FK without cascade and setting null, uncomment below
            // (requires doctrine/dbal for change())
            // $table->unsignedBigInteger('item_id')->nullable()->change();
            // $table->foreign('item_id')->references('id')->on('items')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('daily_usage_items', function (Blueprint $table) {
            // Restore FK with cascade on delete (original behavior)
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
        });
    }
};
