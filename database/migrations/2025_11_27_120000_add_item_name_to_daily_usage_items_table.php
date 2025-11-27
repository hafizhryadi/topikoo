<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('daily_usage_items', function (Blueprint $table) {
            // Snapshot of item name at time of usage
            $table->string('item_name')->nullable()->after('item_id');
        });

        // Backfill existing rows with current item names using a portable correlated subquery
        DB::statement('update daily_usage_items set item_name = (select items.name from items where items.id = daily_usage_items.item_id) where item_name is null');
    }

    public function down(): void
    {
        Schema::table('daily_usage_items', function (Blueprint $table) {
            $table->dropColumn('item_name');
        });
    }
};
