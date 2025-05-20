<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartApiController;
use App\Http\Controllers\UserApiController;
use App\Http\Controllers\ProductApiController;
use App\Http\Controllers\CartItemApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
// Route::get('/sanctum/csrf-cookie', function () {
//     return response()->json(['csrf_token' => csrf_token()]);
// });

Route::post('/register', [UserApiController::class, 'register']);
Route::post('/login', [UserApiController::class, 'login']);

Route::post('/logout', [UserApiController::class, 'logout'])->middleware(['auth:sanctum']);



Route::get('products',[ProductApiController::class,'index']);
Route::post('products',[ProductApiController::class,'store']);
Route::get('products/{id}',[ProductApiController::class,'show']);
Route::put('products/{id}',[ProductApiController::class,'update']);
Route::delete('products/{id}',[ProductApiController::class,'destroy']);

Route::post('cartitem',[CartItemApiController::class,'store']);
Route::put('cartitem',[CartItemApiController::class,'update']);
Route::delete('cartitem/{id}',[CartItemApiController::class,'delete']);


Route::get('cart',[CartApiController::class,'index']);