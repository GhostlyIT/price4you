<?php

namespace App\Http\Controllers;

use App\Models\Fertiliser;
use App\Models\Seed;
use Illuminate\Http\Request;
use App\Exceptions\ValidationException;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;

class ProductsController extends Controller
{
    protected function failedValidation($validator)
    {
        throw new ValidationException($validator);
    }


    public function searchAllProducts(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'min:1'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $query = $request->get('query');

        try {
            $products = Product::where('name_product_rus', 'like', "%$query%")->get();
            $seeds = Seed::where('name_seed_rus', 'like', "%$query%")->get();
            $fertilisers = Fertiliser::where('name_fertiliser', 'like', "%$query%")->get();
            $totalResult = [
                'products' => $products,
                'seeds' => $seeds,
                'fertilisers' => $fertilisers
            ];
            if ($products->isEmpty() && $seeds->isEmpty() && $fertilisers->isEmpty()) throw new \Exception('По запросу ничего не найдено');
            return response()->json(['search_result' => $totalResult, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }

    public function getProductClass(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $id = $request->get('product_id');
        try {
            $product = Product::where('id_product', $id)->firstOrFail();
            $productClass = $product->productClass->name_clproduct_rus;
            return response()->json(['product_class' => $productClass, 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }
}
