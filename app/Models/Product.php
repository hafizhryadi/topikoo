<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    protected $guarded = [];

    // Add any relationships or methods as needed
    public function transcations(): BelongsToMany
    {
        return $this->belongsToMany(Transcation::class);
    }
}
