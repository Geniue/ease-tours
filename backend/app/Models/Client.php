<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'passport_number',
        'nationality',
        'notes',
    ];

    public function transactions(): HasMany
    {
        return $this->hasMany(ClientTransaction::class);
    }

    public function getTotalRevenueAttribute(): float
    {
        return (float) $this->transactions()->where('status', 'done')->sum('sell_price');
    }

    public function getTotalProfitAttribute(): float
    {
        return (float) $this->transactions()->where('status', 'done')->sum('profit');
    }

    public function getTotalCollectedAttribute(): float
    {
        return (float) $this->transactions()->sum('current_money');
    }

    public function getOutstandingBalanceAttribute(): float
    {
        return (float) $this->transactions()
            ->where('status', 'done')
            ->selectRaw('SUM(sell_price - COALESCE(current_money, 0)) as total')
            ->value('total') ?? 0;
    }
}
