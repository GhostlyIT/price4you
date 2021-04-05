<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DeferredOrder;
use App\Services\ProductService;

class DeferredOrderController extends Controller
{
    public function save(Request $request)
    {
        try {
            DeferredOrder::updateOrCreate(
                ['ip' => $request->get('ip')],
                ['products' => $request->get('products')]
            );
            return response()->json(['message' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function findOrder(Request $request)
    {
        $userIP = $request->get('ip');
        $order = DeferredOrder::where('ip', $userIP)->first();
        $products = [];

        if ($order !== NULL) {
            try {
                foreach (json_decode($order->products) as $item) {
                    $product = new ProductService($item->product_id, $item->product_type);
                    $products[] = $product->getProduct();
                }
            } catch (\Exception $e) {
                return response()->json(['message' => $e->getMessage(), 'line' => $e->getLine()], 400);
            }

            $order->delete();
        }

        return response()->json(['order' => $products]);
    }
}
