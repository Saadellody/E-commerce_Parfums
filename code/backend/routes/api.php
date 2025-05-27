<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartApiController;
use App\Http\Controllers\UserApiController;
use App\Http\Controllers\OrderApiController;
use App\Http\Controllers\ProductApiController;
use App\Http\Controllers\CartItemApiController;
use App\Http\Controllers\OrderItemApiController;

// Public routes
Route::post('/register', [UserApiController::class, 'register']);
Route::post('/login', [UserApiController::class, 'login']);

Route::get('products', [ProductApiController::class, 'index']);
Route::get('products/{id}', [ProductApiController::class, 'show']);

// Protected routes (require auth:sanctum)
Route::middleware('auth:sanctum')->group(function () {

    // User
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [UserApiController::class, 'logout']);

    // Products (admin access typically)
    Route::post('products', [ProductApiController::class, 'store']);
    Route::put('products/{id}', [ProductApiController::class, 'update']);
    Route::delete('products/{id}', [ProductApiController::class, 'destroy']);

    // Cart Items
    Route::post('cartitem', [CartItemApiController::class, 'store']);
    Route::put('cartitem', [CartItemApiController::class, 'update']);
    Route::delete('cartitem/{id}', [CartItemApiController::class, 'delete']);

    // Cart
    Route::get('cart', [CartApiController::class, 'index']);
    Route::put('cart/{id}', [CartApiController::class, 'updateQuantity']);
    Route::delete('cart/{id}', [CartApiController::class, 'removeItem']);
    Route::delete('cart', [CartApiController::class, 'clearCart']);

    
    Route::get('/orders', [OrderApiController::class, 'index']);
    Route::post('/orders', [OrderApiController::class, 'store']);
    Route::get('/orders/{id}', [OrderApiController::class, 'show']);
    Route::put('/orders/{id}', [OrderApiController::class, 'update']);
    Route::delete('/orders/{id}', [OrderApiController::class, 'destroy']);

    // Order Items
    Route::get('/order-items', [OrderItemApiController::class, 'index']);
    Route::post('/order-items', [OrderItemApiController::class, 'store']);
    Route::get('/order-items/{id}', [OrderItemApiController::class, 'show']);
    Route::put('/order-items/{id}', [OrderItemApiController::class, 'update']);
    Route::delete('/order-items/{id}', [OrderItemApiController::class, 'destroy']);

    Route::get('/admin/orders', [OrderApiController::class, 'fetchAllOrders']);
    Route::put('/admin/orders/{id}/status', [OrderApiController::class, 'updateOrderStatus']);

});

