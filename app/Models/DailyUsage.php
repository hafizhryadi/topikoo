<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyUsage extends Model
{
    protected $guarded = [];

    protected $casts = [
        'date' => 'date',
    ];

    public function items()
    {
        return $this->hasMany(DailyUsageItem::class);
    }
}
