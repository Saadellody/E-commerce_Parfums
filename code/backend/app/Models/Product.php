<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable=[
        'name',
        'description',
        'price',
        'stock_quantity',
        'category',
        'image'
    ];
    public function OrderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
    public function CartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}
