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
    public function updateQuantity(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);
        
        $cart = Auth::user()->cart;
        if(!$cart){
            return response()->json(['message'=>'cart not found'],404);
        }
        
        $cartItem = $cart->cartItems()->where('product_id', $id)->first();
        if(!$cartItem){
            return response()->json(['message'=>'product not found in cart'],404);
        }
        
        $cartItem->quantity = $request->quantity;
        $cartItem->save();
        
        // Return the updated product with quantity
        $product = $cartItem->product;
        $product->quantity = $cartItem->quantity;
        $product->cart_item_id = $cartItem->id;
        
        return response()->json(new CartItemResource($product), 200);
    }
    
    public function removeItem($id)
    {
        $cart = Auth::user()->cart;
        if(!$cart){
            return response()->json(['message'=>'cart not found'],404);
        }
        
        $cartItem = $cart->cartItems()->where('product_id', $id)->first();
        if(!$cartItem){
            return response()->json(['message'=>'product not found in cart'],404);
        }
        
        $cartItem->delete();
        
        return response()->json(['message'=>'product removed from cart successfully'], 200);
    }
    public function clearCart(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    // Load user's cart with cartItems
    $cart = $user->cart;

    if (!$cart) {
        return response()->json(['message' => 'Cart not found'], 404);
    }

    try {
        // Delete all cart items for this cart
        $cart->cartItems()->delete();
    } catch (\Exception $e) {
        return response()->json(['message' => 'Failed to clear cart', 'error' => $e->getMessage()], 500);
    }

    return response()->json(['message' => 'command passed successfully']);
}


    
    
}
