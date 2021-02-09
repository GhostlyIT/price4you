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
            'title' => 'max:255',
            'payment_method' => 'required|string',
            'delivery_method' => 'required|string',
            'comment' => 'max:2000',
            'delivery_address' => 'required|string',
            'products' => 'required|array',
            'products.*.id' => 'required|integer',
            'products.*.value' => 'required|integer',
            'products.*.unit' => 'string|max:10',
            'products.*.type_for_db' => 'required|string',
            'region' => 'required|integer'
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
        $region = $request->get('region');

        try {
            DB::beginTransaction();

            $userRequest = UserRequests::create([
                'title' => $title,
                'user_id' => Auth::id(),
                'payment_method' => $paymentMethod,
                'delivery_method' => $deliveryMethod,
                'comment' => $comment,
                'delivery_address' => $deliveryAddress,
                'region_id' => $region
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

    public function getForUser(Request $request) {
        try {
            $user = Auth::user();
            $requests = $user->requests()->with([
                'region',
                'products',
                'products.product',
                'products.fertiliser',
                'products.seed',
                'products.responses' => function ($q) {
                    $q->where('status', 'open');
                }
            ])->get();
            return response()->json(['requests' => $requests, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }

    public function getForCompany(Request $request) {
        $validator = Validator::make($request->all(), [
            'offset' => 'required|integer',
            'limit' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $offset = $request->get('offset');
        $limit = $request->get('limit');

        try {
            $user = Auth::user();
            $company = $user->company;
            $companyManufactures = $company->manufacturesIDs()->pluck('manufacture_id')->toArray();
            $companyRegions = $company->regionsIDs()->pluck('region_id')->toArray();
            $companyProducts = $company->productsMiddleware()->get();

            $requests = UserRequestsAndProducts::where('status', 'open')
                ->with([
                    'request' => function($q) use ($companyRegions) {
                        if (count($companyRegions) > 0) $q->whereIn('region_id', $companyRegions)->get();
                    },
                    'request.region',
                    'product' => function($q) use ($companyManufactures, $company, $companyProducts) {
                        $res = $q->with('taraMiddleware.tara');

                        if (count($companyProducts) > 0) {
                            $companyProductsIDs = $company->productsMiddleware()->where('product_type', 'product')->pluck('product_id')->toArray();
                            $res = $res->whereIn('id_product', $companyProductsIDs);
                        }

                        if (count($companyManufactures) > 0 && count($companyProducts) > 0) $res = $res->orWhereIn('id_manufacture', $companyManufactures);
                        if (count($companyManufactures) > 0 && count($companyProducts) < 1) $res = $res->whereIn('id_manufacture', $companyManufactures);

                        $res->get();
                    },
                    'fertiliser' => function($q) use ($companyManufactures, $company, $companyProducts) {
                        $res = $q->with('taraMiddleware.tara');

                        if (count($companyProducts) > 0) {
                            $companyProductsIDs = $company->productsMiddleware()->where('product_type', 'fertiliser')->pluck('product_id')->toArray();
                            $res = $res->whereIn('id_fertiliser', $companyProductsIDs);
                        }

                        if (count($companyManufactures) > 0 && count($companyProducts) > 0) $res = $res->orWhereIn('id_manufacture', $companyManufactures);
                        if (count($companyManufactures) > 0 && count($companyProducts) < 1) $res = $res->whereIn('id_manufacture', $companyManufactures);

                        $res->get();
                    },
                    'seed' => function($q) use ($companyManufactures, $company, $companyProducts) {
                        $res = $q->with('taraMiddleware.tara');

                        if (count($companyProducts) > 0) {
                            $companyProductsIDs = $company->productsMiddleware()->where('product_type', 'seed')->pluck('product_id')->toArray();
                            $res = $res->whereIn('id_seed_product', $companyProductsIDs);
                        }

                        if (count($companyManufactures) > 0 && count($companyProducts) > 0) $res = $res->orWhereIn('id_manufacture', $companyManufactures);
                        if (count($companyManufactures) > 0 && count($companyProducts) < 1) $res = $res->whereIn('id_manufacture', $companyManufactures);

                        $res->get();
                    },
                    'responses'
                ])
                ->orderBy('created_at', 'desc')
                ->get();

            $requestsArr = [];

            foreach($requests as $request) {
                if ($request[$request['product_type']] != null && $request['request'] != null) $requestsArr[] = $request;
            }

            $requestsCount = count($requestsArr);

            return response()->json(['requests' => array_slice($requestsArr, $offset, $limit), 'requests_count' => $requestsCount, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }

    public function delete($requestId) {
        try {
            $request = UserRequests::findOrFail($requestId);
            $request->products()->delete(); //TODO: переделать через Events
            $request->responses()->delete();
            $request->delete();
            return response()->json(['message' => 'Запрос успешно удален', 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }
}
