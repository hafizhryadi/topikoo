<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Item::all();
        return Inertia::render('items/index', [
            'items' => $items,
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
        // Basic validation for required fields
        $data = $request->only(['name', 'description', 'quantity', 'price']);

        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:1',
        ]);

        // After base validation, enforce case-sensitive uniqueness for `name`.
        $validator->after(function ($validator) use ($data) {
            if (!isset($data['name'])) {
                return;
            }

            $driver = DB::getDriverName();
            $name = $data['name'];

            $exists = false;

            if ($driver === 'mysql') {
                // MySQL: use BINARY for case-sensitive comparison
                $exists = Item::whereRaw('BINARY `name` = ?', [$name])->exists();
            } elseif ($driver === 'sqlite') {
                // SQLite: apply COLLATE BINARY to the column for case-sensitive comparison
                $exists = Item::whereRaw('"name" COLLATE BINARY = ?', [$name])->exists();
            } else {
                // Fallback: strict equality (may or may not be case-sensitive depending on DB)
                $exists = Item::where('name', $name)->exists();
            }

            if ($exists) {
                $validator->errors()->add('name', 'The name has already been taken.');
            }
        });

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        Item::create($validator->validated());

        return redirect()->route('items.index')->with('success', 'Item created successfully.');
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
        // Gather data and validate
        $data = $request->only(['name', 'description', 'quantity', 'price']);

        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:1',
        ]);

        // Apply case-sensitive uniqueness for name, excluding current item
        $validator->after(function ($validator) use ($data, $id) {
            if (!isset($data['name'])) {
                return;
            }

            $driver = DB::getDriverName();
            $name = $data['name'];

            $exists = false;

            if ($driver === 'mysql') {
                $exists = Item::whereRaw('BINARY `name` = ?', [$name])
                    ->where('id', '!=', $id)
                    ->exists();
            } elseif ($driver === 'sqlite') {
                $exists = Item::whereRaw('"name" COLLATE BINARY = ?', [$name])
                    ->where('id', '!=', $id)
                    ->exists();
            } else {
                $exists = Item::where('name', $name)
                    ->where('id', '!=', $id)
                    ->exists();
            }

            if ($exists) {
                $validator->errors()->add('name', 'The name has already been taken.');
            }
        });

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $item = Item::findOrFail($id);
        $item->update($validator->validated());

        return redirect()->route('items.index')->with('success', 'Item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $item = Item::findOrFail($id);
        $item->delete();

        return redirect()->route('items.index')->with('success', 'Item deleted successfully.');
    }
}
