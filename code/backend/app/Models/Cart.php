<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cart extends Model
{
    protected $fillable= [
        'user_id',
        'status'
    ];

    public function user()
    {
        return $this->BelongsTo(User::class);
    }

    public function cartItems(){
        return $this->hasMany(CartItem::class);
    }
}
