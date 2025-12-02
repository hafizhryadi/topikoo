<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Redeem;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class RedeemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('redeem/form', [
            'title' => 'Manual Promo Code Redeem',
            'action' => route('redeem.store'),
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
            'code' => 'required|string',
        ]);

        $code = strtoupper(trim($validated['code']));

        try {
            $result = DB::transaction(function () use ($code, $request) {
                if (class_exists(Redeem::class)) {
                    try {
                        $entry = Redeem::create([
                            'code' => $code,
                            'staff_id' => $request->user()->id ?? null,
                            'processed_at' => Carbon::now(),
                        ]);

                        return [
                            'success' => true,
                            'message' => 'Code redeemed.',
                            'data' => [
                                'id' => $entry->id,
                                'code' => $entry->code,
                            ],
                            'http_status' => 200,
                        ];
                    } catch (\Illuminate\Database\QueryException $ex) {
                        // likely unique constraint violation
                        return [
                            'success' => false,
                            'message' => 'Code already exists.',
                            'http_status' => 409,
                        ];
                    }
                }

                return [
                    'success' => false,
                    'message' => 'Storage table not available.',
                    'http_status' => 500,
                ];
            }, 3);

            return response()->json(
                $result['success'] ? [
                    'success' => true,
                    'message' => $result['message'],
                    'data' => $result['data'] ?? null,
                ] : [
                    'success' => false,
                    'message' => $result['message'],
                ],
                $result['http_status']
            );
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save code.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
