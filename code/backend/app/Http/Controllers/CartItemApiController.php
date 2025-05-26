<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartItemApiController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'quantity' => 'required|numeric|min:1',
        'product_id' => 'required|numeric',
        'price' => 'required|numeric',
    ]);

    $user = Auth::user();
    $cart = $user->cart;

    if (!$cart) {
        // Optional: create cart if not exists
        $cart = Cart::create(['user_id' => $user->id]);
    }

    $productId = $request->input('product_id');
    $quantityToAdd = $request->input('quantity');
    $price = $request->input('price');

    // Find if product already exists in cart
    $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $productId)
                ->first();

    if ($cartItem) {
        // Update quantity by adding
        $cartItem->quantity += $quantityToAdd;
        $cartItem->save();
    } else {
        // Create new cart item
        CartItem::create([
            'cart_id' => $cart->id,
            'product_id' => $productId,
            'quantity' => $quantityToAdd,
            'price' => $price,
        ]);
    }

    return app(CartApiController::class)->index();
}

public function update(Request $request)
{
    $request->validate([
        'item_id' => 'required|numeric',
        'quantity' => 'required|numeric|min:1',
    ]);

    $item = CartItem::where('product_id', '=', $request->input('item_id'))->first();

    if (!$item) {
        return response()->json([
            'message' => 'item not found'
        ], 404);
    }

    $item->quantity = $request->input('quantity');
    $item->save();

    return app(CartApiController::class)->index();
}

    
    public function delete($id){

        $item=CartItem::where('product_id','=',$id)->first();

        if(!$item){
            return response()->json([
                'message'=>'item not found'
            ],404);
        }
        $item->delete();
        return app(CartApiController::class)->index();
    }
}
