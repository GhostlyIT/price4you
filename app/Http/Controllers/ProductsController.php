<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exceptions\ValidationException;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;

class ProductsController extends Controller
{
    protected function failedValidation($validator) {
        throw new ValidationException($validator);
    }

    public function search(Request $request) {
        $validator = Validator::make($request->all(), [
            'query' => 'min:1'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $query = $request->get('query');
        try {
            $searchAttempt = Product::where('name_product_rus', 'like', '%'.$query.'%')->get();
            if ($searchAttempt->isEmpty()) throw new \Exception('Не найдено товаров по вашему запросу');
            return response()->json(['search_result' => $searchAttempt, 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }

    public function getProductClass(Request $request) {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $id = $request->get('product_id');
        try {
            $product = Product::where('id_product', $id)->first();
            $productClass = $product->productClass->name_clproduct_rus;
            return response()->json(['product_class' => $productClass, 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }
}
