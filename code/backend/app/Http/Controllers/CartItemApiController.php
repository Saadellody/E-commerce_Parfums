<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartItemApiController extends Controller
{
    public function store(Request $request){

        $request->validate([
            'quantity'=>'required|numeric',
            'product_id'=>'required|numeric',
            'price'=>'required|numeric',
        ]);

        $user= Auth::user();
        $cart= $user->cart;

        CartItem::create([
            'cart_id'=>$cart,
            'quantity'=>$request->input('quantity'),
            'product_id'=>$request->input('product_id'),
            'price'=>$request->input('price')
        ]);

        return app(CartApiController::class)->index();
    }
    public function update(Request $request){
        $request->validate([
            'item_id'=>'required|numeric',
            'quantity'=>'required|numeric'
        ]);

        $item=CartItem::where('product_id','=',$request->input('item_id'))->first();

        if($item){
            return response()->json([
                'message'=>'item not found'
            ],404);
        }
        $item->quantity=$request->input('quantity');
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
