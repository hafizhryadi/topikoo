<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transcation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Eager load single product relation for each transaction row
        $transactions = Transcation::with('product')->latest('date')->get();

        // Provide products list for the create form selector
        $products = Product::orderBy('name')->get(['id', 'name', 'price']);

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.amount' => 'required|integer|min:1',
            'items.*.unit_price' => 'nullable|numeric|min:0',
        ]);

        // Create one Transcation row per selected product. Use DB transaction.
        \DB::transaction(function () use ($validated) {
            foreach ($validated['items'] as $it) {
                $product = Product::find($it['product_id']);

                $unitPrice = $it['unit_price'] ?? ($product->price ?? 0);
                $totalPrice = $unitPrice * $it['amount'];

                Transcation::create([
                    'date' => $validated['date'],
                    'note' => $validated['notes'] ?? null,
                    'product_id' => $product->id,
                    'amount' => $it['amount'],
                    'unit_price' => $unitPrice,
                    'total_price' => $totalPrice,
                ]);
            }
        });

        return redirect()->route('transactions.index')->with('success', 'Transaction recorded.');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
