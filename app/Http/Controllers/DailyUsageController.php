<?php

namespace App\Http\Controllers;

use App\Models\DailyUsage;
use App\Models\DailyUsageItem;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DailyUsageController extends Controller
{
    public function index()
    {
        // Load only usage items; rely on stored snapshot fields (item_name, unit_price, total_price)
        $usages = DailyUsage::with('items')->latest('date')->get();
        return Inertia::render('daily_usages/index', [
            'daily_usages' => $usages
        ]);
    }

    public function create()
    {
        return Inertia::render('daily_usages/create', [
            'items' => Item::orderBy('name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.item_id' => 'required|exists:items,id',
            'items.*.quantity_used' => 'required|integer|min:1',
            'items.*.notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated) {
            $dailyUsage = DailyUsage::create([
                'date' => $validated['date'],
                'notes' => $validated['notes'],
            ]);

            foreach ($validated['items'] as $itemData) {
                $item = Item::lockForUpdate()->find($itemData['item_id']);

                // Deduct quantity
                $item->decrement('quantity', $itemData['quantity_used']);

                // Calculate prices
                $unitPrice = $item->price; 
                $totalPrice = $unitPrice * $itemData['quantity_used'];

                DailyUsageItem::create([
                    'daily_usage_id' => $dailyUsage->id,
                    'item_id' => $item->id,
                    'item_name' => $item->name,
                    'quantity_used' => $itemData['quantity_used'],
                    'unit_price' => $unitPrice,
                    'total_price' => $totalPrice,
                ]);
            }
        });

        return redirect()->route('daily-usages.index')->with('success', 'Daily usage recorded successfully.');
    }
}
