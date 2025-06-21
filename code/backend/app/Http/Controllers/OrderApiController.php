<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderApiController extends Controller
{
    public function fetchAllOrders(Request $request)
    {
        // // Optional: Only allow admins to access this
        // if (!$request->user() || !$request->user()->is_admin) {
        //     return response()->json(['message' => 'Forbidden'], 403);
        // }

        $orders = Order::with(['user', 'orderItems.product'])->latest()->get();

        return response()->json($orders, 200);
    }
    public function index()
{
    return Order::with(['orderItems.product']) // include order items and their products
                ->where('user_id', Auth::id())
                ->get();
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'total_price' => 'required|numeric',
            'status' => 'in:pending,shipped,shipped,processing,cancelled',
        ]);

        $order = Order::create($validated);
        return response()->json($order, 201);
    }

    public function show($id)
    {
        $order = Order::with(['user', 'orderItems'])->findOrFail($id);
        return response()->json($order);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $validated = $request->validate([
            'total_price' => 'sometimes|numeric',
            'status' => 'in:pending,shipped,shipped,processing,cancelled',
        ]);
        $order->update($validated);
        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }

    public function updateOrderStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'in:pending,Delivered,shipped,processing,cancelled',
    ]);

    $order = Order::find($id);

    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    $order->status = $request->status;
    $order->save();

    return response()->json(['message' => 'Order status updated', 'order' => $order], 200);
}

}
