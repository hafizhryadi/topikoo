<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Transcation extends Model
{
    protected $guarded = [];

    // 1 transaction can have many products (items)
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }

    // Per-row product reference when storing one product per transaction row
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
