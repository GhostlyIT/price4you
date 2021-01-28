<?php

namespace App\Http\Controllers;

use App\Models\Fertiliser;

use App\Models\Seed;

use App\Models\Product;

use Illuminate\Http\Request;

use App\Exceptions\ValidationException;

use Illuminate\Support\Facades\Validator;


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
            $products = Product::select('id_product AS id', 'name_product_rus')->where('name_product_rus', 'like', "%$query%")->with('tara')->orderBy('name_product_rus')->get();
            foreach ($products as $product) {
                //$product['culture'] = $product->culture()->get();
                if ($product->regdata()->first()) {
                    $product['regdata'] = $product->regdata()->with('culture')->get();
                } elseif ($product->regdataForLph()->first()) {
                    $product['regdata'] = $product->regdataForLph()->with('culture')->get();
                } elseif ($product->regdataForAvia()->first()) {
                    $product['regdata'] = $product->regdataForAvia()->with('culture')->get();
                }
            }
            $seeds = Seed::select('id_seed_product AS id', 'name_seed_rus')->where('name_seed_rus', 'like', "%$query%")->with('tara')->orderBy('name_seed_rus')->get();
            $fertilisers = Fertiliser::select('id_fertiliser AS id', 'name_fertiliser')->where('name_fertiliser', 'like', "%$query%")->with('tara')->orderBy('name_fertiliser')->get();
            $totalResult = [
                'Защита растений' => $products,
                'Семена' => $seeds,
                'Удобрения' => $fertilisers
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

    public function getRatesByCulture(Request $request) {
        $validator = Validator::make($request->all(), [
            'id_product' => 'required|integer',
            'id_culture' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $idProduct = $request->get('id_product');
        $idCulture = $request->get('id_culture');
        $result = [];

        try {
            $rates = Product::where('id_product', $idProduct)->firstOrFail()->regdata()->select('min_rate', 'max_rate')->where('id_culture', $idCulture)->get();

            foreach ($rates as $rate) {
                $result[] = $rate['min_rate'];
                $result[] = $rate['max_rate'];
            }
            $result = array_unique($result);
            sort($result);

            return response()->json(['rates' => $result, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }

    public function calculateProductVolume(Request $request) {
        $validator = Validator::make($request->all(), [
            'id_culture' => 'required|integer|min:1',
            'area' => 'required|integer|min:1',
            'rate' => 'required|numeric|min:0.1'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $idCulture = $request->get('id_culture');
        $area = $request->get('area');
        $rate = $request->get('rate');

        try {
            $result = $area * $rate;
            return response()->json(['result' => $result, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }
}
