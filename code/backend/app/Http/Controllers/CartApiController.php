<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CartItemResource;

class CartApiController extends Controller
{
    public function index()
    {
        $cart = Auth::user()->cart;
       
        if(!$cart){
            return response()->json(['message'=>'cart not found'],404);
        }
        $products= $cart->cartItems->pluck('product');
        $cartitems= $cart->cartItems;
        if($products->isEmpty()){
            return response()->json(['message'=>'the cart is empty '],200);
        }

        $newproduct = $products->map(function($product) use ($cartitems) {
            
            $cartItem = $cartitems->first(function($cartItem) use ($product) {
                return $cartItem->product_id === $product->id;
            });
        
            if ($cartItem) {
                $product->quantity = $cartItem->quantity;
            }  
        
            return $product;  
        });
        
        return response()->json(CartItemResource::collection($newproduct), 200);

    } 
}
