<?php

use App\Http\Controllers\AdminRedeemController;
use App\Http\Controllers\RedeemController;
use App\Http\Controllers\DailyUsageController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('items', ItemsController::class);
    Route::resource('daily-usages', DailyUsageController::class);
    Route::resource('products', ProductController::class);
    Route::resource('transactions', TransactionController::class);
    Route::get('leaderboard', [TransactionController::class, 'leaderboard'])->name('transactions.leaderboard');
    Route::get('transactions/report/weekly', [TransactionController::class, 'weeklyReport'])->name('transactions.report.weekly');
    Route::resource('redeem', RedeemController::class)->only(['index', 'store']);
});



require __DIR__ . '/settings.php';
