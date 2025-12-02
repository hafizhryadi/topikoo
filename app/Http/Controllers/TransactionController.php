<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transcation;
use App\Services\WhatsAppNotifier;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
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

    public function leaderboard()
    {
        $leaderboard = Transcation::select('phone', DB::raw('SUM(total_price) as total_spent'))
            ->groupBy('phone')
            ->orderByDesc('total_spent')
            ->get();

        return Inertia::render('transactions/leaderboard', [
            'leaderboard' => $leaderboard,
        ]);
    }

    /**
     * Download weekly transactions report (CSV) for the last 7 days.
     */
    public function weeklyReport()
    {
        $from = now()->subDays(7)->startOfDay();
        $to = now()->endOfDay();

        $rows = Transcation::with('product')
            ->whereBetween('date', [$from->toDateString(), $to->toDateString()])
            ->orderBy('date')
            ->get(['id', 'date', 'phone', 'product_id', 'amount', 'unit_price', 'total_price', 'note']);

        // Generate an Excel-compatible HTML table and serve as .xls
        $filename = 'weekly-transactions-' . now()->format('Ymd_His') . '.xlsx';

        return response()->streamDownload(function () use ($rows) {
            echo '<html><head><meta charset="UTF-8"></head><body>';
            echo '<table border="1">';
            echo '<tr>';
            foreach (['Date', 'Phone', 'Product', 'Amount', 'Unit Price', 'Total', 'Notes'] as $h) {
                echo '<th>' . htmlspecialchars($h, ENT_QUOTES, 'UTF-8') . '</th>';
            }
            echo '</tr>';
            $grandTotal = 0;
            foreach ($rows as $r) {
                echo '<tr>';
                $cols = [
                    $r->date,
                    $r->phone,
                    optional($r->product)->name,
                    $r->amount,
                    $r->unit_price,
                    $r->total_price,
                    $r->note,
                ];
                $grandTotal += (float) ($r->total_price ?? 0);
                foreach ($cols as $c) {
                    echo '<td>' . htmlspecialchars((string) ($c ?? ''), ENT_QUOTES, 'UTF-8') . '</td>';
                }
                echo '</tr>';
            }
            // Grand total row
            echo '<tr>';
            echo '<td colspan="5" style="font-weight:bold">Grand Total</td>';
            echo '<td style="font-weight:bold">' . htmlspecialchars((string) $grandTotal, ENT_QUOTES, 'UTF-8') . '</td>';
            echo '<td></td>';
            echo '</tr>';
            echo '</table>';
            echo '</body></html>';
        }, $filename, [
            'Content-Type' => 'application/vnd.ms-excel',
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
            'phone' => 'required|numeric',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.amount' => 'required|integer|min:1',
            'items.*.unit_price' => 'nullable|numeric|min:0',
        ]);

        // Calculate grand total for promo eligibility (1 promo per 100000)
        $grandTotal = 0;
        foreach ($validated['items'] as $it) {
            $product = Product::find($it['product_id']);
            $unitPrice = $it['unit_price'] ?? ($product->price ?? 0);
            $grandTotal += ($unitPrice * ($it['amount'] ?? 0));
        }

        $perThreshold = 100000;
        $promoCount = (int) floor($grandTotal / $perThreshold);

        // Generate promo codes (kept in-memory; optionally appended into first row's note)
        $promoCodes = [];
        if ($promoCount > 0) {
            for ($i = 0; $i < $promoCount; $i++) {
                $promoCodes[] = strtoupper(Str::random(8));
            }
        }

        // Normalize phone to E.164 (+62...) if needed (keeps same DB column)
        $phone = (string) $validated['phone'];
        if (substr($phone, 0, 1) !== '+') {
            $phone = '+62' . ltrim($phone, '0');
        }

        // Send WhatsApp notification if any promo
        // if ($promoCount > 0) {
        //     $codesList = implode(', ', $promoCodes);
        //     $message = "Terima kasih! Anda mendapatkan promo.\n"
        //         . "Kode redeem ({$promoCount}): {$codesList}\n\n"
        //         . "Silakan tukarkan kode di: toko offline\n"
        //         . "Syarat & ketentuan berlaku.";
        //     try {
        //         $wa->send($phone, $message);
        //     } catch (\Throwable $e) {
        //         \Log::warning('WhatsApp send failed', ['phone' => $phone, 'error' => $e->getMessage()]);
        //     }
        // }

        // Create one Transcation row per selected product. Use DB transaction.
        DB::transaction(function () use ($validated, $promoCodes) {
            $appendNote = '';
            if (!empty($promoCodes)) {
                $appendNote = ' Promo codes: ' . implode(', ', array: $promoCodes);
            }
            $isFirst = true;
            foreach ($validated['items'] as $it) {
                $product = Product::find($it['product_id']);

                $unitPrice = $it['unit_price'] ?? ($product->price ?? 0);
                $totalPrice = $unitPrice * $it['amount'];

                Transcation::create([
                    'date' => $validated['date'],
                    'note' => ($validated['notes'] ?? null),
                    'phone' => $validated['phone'],
                    'product_id' => $product->id,
                    'amount' => $it['amount'],
                    'unit_price' => $unitPrice,
                    'total_price' => $totalPrice,
                    'code' => $isFirst && !empty($promoCodes) ? implode(', ', $promoCodes) : null,
                ]);
                $isFirst = false;
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
