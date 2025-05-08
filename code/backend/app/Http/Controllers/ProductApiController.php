<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\File;

class ProductApiController extends Controller
{
    public function index(Request $request){
        
        $query = Product::query();

        if($request->has('name')){
            $query->where('name','like','%' .$request->query('name').'%');
        }

        if($request->has('category')){
            $query->where('category','like','%'.$request->query('category').'%');
        }

        $products=$query->get();

        if($products){
            return response()->json(ProductResource::collection($products),200);
        }else{
            return response()->json([
                'message'=>'there is not records in the product model ',200
            ]);
        }
    }
    public function store(Request $request){
        $request->validate([
            'name'=>'required|string|max:255',
            'description'=>'required|string|max:500',
            'price'=>'required|numeric|min:0.01',
            'stock_quantity'=>'required|integer|min:0',
            'category'=>'required|string|max:255',
            'image'=>'nullable|image|mimes:jpg,jpeg,png,svg,gif,webp|max:2048'
            
        ]);

        $image='no_image.png';

        if($request->hasFile('image')){
            $image=$request->file('image')->store('images','public');
            
        }
        Product::create([
                'name'=>$request->input('name'),
                'description'=>$request->input('description'),
                'price'=>$request->input('price'),
                'stock_quantity'=>$request->input('stock_quantity'),
                'image'=>$image,
                'category'=>$request->input('category'),
    
        ]);

        return response()->json([
            'message'=>'a product has been created successfully'
        ],201);
    }

    public function update($id ,Request $request){

         $request->validate([
            'name'=>'required|string|max:255',
            'description'=>'required|string|max:500',
            'price'=>'required|numeric|min:0.01',
            'stock_quantity'=>'required|integer|min:0',
            'category'=>'required|string|max:255',
            'image'=>'nullable|image|mimes:jpg,jpeg,png,svg,gif,webp|max:2048'
            
        ]);

        $product= Product::findOrFail($id);

        if($request->hasFile('image')){
            $oldimg=public_path('images/'.$product->image);
            if(File::exists($oldimg)){
                File::delete($oldimg);
            }

            $file_name=$request->file('image')->store('images','public');

            $product->name=$request->input('name');
            $product->description=$request->input('description');
            $product->price=$request->input('price');
            $product->stock_quantity=$request->input('stock_quantity');
            $product->category=$request->input('category');
            $product->image=$file_name;

            $product->save();
        }else{
            $product->name=$request->input('name');
            $product->description=$request->input('description');
            $product->price=$request->input('price');
            $product->stock_quantity=$request->input('stock_quantity');
            $product->category=$request->input('category');

            $product->save();
        }

        return response()->json([
            'message'=>'a record in model product has been updated successfully'
        ],200);
    }

    public function show($id){

        $product=Product::findOrFail($id);

        return response()->json(new ProductResource($product),200);
    }

    public function destroy($id){

        $product= Product::findOrFail($id);

        $productImage= storage_path('app/public'.$product->image);
        if(File::exists($productImage)){
            File::delete($productImage);
        }
        
        $product->delete();

        return response()->json([
            'message'=>'product deleted successfully'
        ],200);
    }
}
