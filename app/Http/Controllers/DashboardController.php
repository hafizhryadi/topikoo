<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Defensive access to models (typo Transcation etc.)
        $itemsCount = class_exists(\App\Models\Item::class) ? \App\Models\Item::count() : 0;
        $productsCount = class_exists(\App\Models\Product::class) ? \App\Models\Product::count() : 0;
        $transactionsCount = class_exists(\App\Models\Transcation::class) ? \App\Models\Transcation::count() : 0;
        $dailyUsageCount = class_exists(\App\Models\DailyUsage::class) ? \App\Models\DailyUsage::count() : 0;

        $revenue = 0;
        $uniqueCustomers = 0;
        $promoCodesTotal = 0;
        $promoCodesUnredeemed = 0;

        if (class_exists(\App\Models\Transcation::class)) {
            $revenue = (int) \App\Models\Transcation::whereNotNull('total_price')
                ->where('total_price', '>', 0)
                ->sum('total_price');
            $uniqueCustomers = \App\Models\Transcation::whereNotNull('phone')->distinct()->count('phone');
            $promoCodesTotal = \App\Models\Transcation::where('note', 'LIKE', 'Promo code:%')->count();
            $promoCodesUnredeemed = \App\Models\Transcation::where('note', 'LIKE', 'Promo code:%')
                ->where('note', 'NOT LIKE', '%REDEEMED%')
                ->count();
        }

        return Inertia::render('dashboard', [
            'metrics' => [
                'items' => $itemsCount,
                'products' => $productsCount,
                'transactions' => $transactionsCount,
                'daily_usages' => $dailyUsageCount,
                'revenue' => $revenue,
                'unique_customers' => $uniqueCustomers,
                'promo_codes_total' => $promoCodesTotal,
                'promo_codes_unredeemed' => $promoCodesUnredeemed,
            ],
        ]);
    }
}
