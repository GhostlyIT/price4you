<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Exceptions\ValidationException;

use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Auth;

use App\Models\UserRequests;

use App\Models\UserRequestsAndProducts;

class RequestController extends Controller
{

    protected function failedValidation($validator)
    {
        throw new ValidationException($validator);
    }

    public function save(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'payment_method' => 'required|string',
            'delivery_method' => 'required|string',
            'comment' => 'string|max:2000',
            'delivery_address' => 'required|string',
            'products' => 'required|array',
            'products.*.id' => 'required|integer',
            'products.*.value' => 'required|integer',
            'products.*.unit' => 'string|max:10',
            'products.*.type_for_db' => 'required|string'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $title = $request->get('title');
        $paymentMethod = $request->get('payment_method');
        $deliveryMethod = $request->get('delivery_method');
        $deliveryAddress = $request->get('delivery_address');
        $comment = $request->get('comment');
        $products = $request->get('products');

        try {
            DB::beginTransaction();

            $userRequest = UserRequests::create([
                'title' => $title,
                'user_id' => Auth::id(),
                'payment_method' => $paymentMethod,
                'delivery_method' => $deliveryMethod,
                'comment' => $comment,
                'delivery_address' => $deliveryAddress
            ]);

            foreach ($products as $product) {
                if (!array_key_exists('unit', $product)) {
                    $product['unit'] = 'кг';
                }

                UserRequestsAndProducts::create([
                    'user_requests_id' => $userRequest->id,
                    'product_type' => $product['type_for_db'],
                    'product_id' => $product['id'],
                    'value' => $product['value'],
                    'unit' => $product['unit']
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Запрос успешно добавлен', 'status' => 'success'],200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }
}
