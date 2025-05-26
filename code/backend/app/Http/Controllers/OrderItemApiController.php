<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemApiController extends Controller
{
    public function index()
    {
        return OrderItem::with(['order', 'product'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric',
        ]);

        $item = OrderItem::create($validated);
        return response()->json($item, 201);
    }

    public function show($id)
    {
        $item = OrderItem::with(['order', 'product'])->findOrFail($id);
        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = OrderItem::findOrFail($id);
        $validated = $request->validate([
            'quantity' => 'sometimes|integer|min:1',
            'price' => 'sometimes|numeric',
        ]);
        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = OrderItem::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}
