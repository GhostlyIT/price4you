<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DeferredOrder;
use App\Services\ProductService;

class DeferredOrderController extends Controller
{
    public function findOrder(Request $request)
    {
        $userIP = $request->get('ip');
        $order = DeferredOrder::where('ip', $userIP)->first();
        $products = [];

        try {
            foreach($order->products as $item) {
                $product = new ProductService($item['product_id'], $item['product_type']);
                $products[] = $product->getProduct();
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'order' => $order, 'ip' => $userIP], 400);
        }

        $order->delete();

        return response()->json(['order' => $products]);
    }
}
