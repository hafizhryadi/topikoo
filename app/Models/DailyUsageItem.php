<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyUsageItem extends Model
{
    protected $guarded = [];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
    ];

    public function dailyUsage()
    {
        return $this->belongsTo(DailyUsage::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
