<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable=[
        'cart_id',
        'product_id',
        'quantity',
        'price'
    ];

    protected $table= 'cartitems';
    
    public function product()
    {
        $this->belongsTo(Product::class);
    }

    public function cart()
    {
        $this->belongsTo(Cart::class);
    }
}
