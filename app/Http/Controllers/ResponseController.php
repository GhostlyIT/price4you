<?php

namespace App\Http\Controllers;

use App\Events\OfferAccepted;
use App\Events\ResponseReceived;
use App\Exceptions\ValidationException;
use App\Models\CompanyResponses;
use App\Models\User;
use App\Models\UserRequestsAndProducts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ResponseController extends Controller
{
    protected function failedValidation($validator)
    {
        throw new ValidationException($validator);
    }

    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'request_id' => 'integer|required',
            'price' => 'integer|required|min:1'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $requestId = $request->get('request_id');
        $price = $request->get('price');
        $comment = null;

        if ($request->has('comment')) {
            $comment = $request->get('comment');
        }

        $user = Auth::user();
        $company = $user->company;

        try {
            $usersRequest = UserRequestsAndProducts::findOrFail($requestId);
            $customer = User::findOrFail($usersRequest->request->user_id);
            $blackList = $customer->blackList()->pluck('company_id')->toArray();
            if (in_array($company->id, $blackList)) throw new \Exception('Вы в черном списке');

            CompanyResponses::create([
                'company_id' => $company->id,
                'request_id' => $requestId,
                'price' => $price,
                'comment' => $comment
            ]);

            ResponseReceived::dispatch($customer, $usersRequest);

            return response()->json(['message' => 'Отклик успешно добавлен', 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getTrace(), 'status' => 'error'],400);
        }
    }

    public function getAllResponsesAmount(Request $request) {
        $user = Auth::user();
        $rCount = 0;

        try {
            $requests = $user->requests()->get();
            foreach($requests as $request) {
                $responsesCount = $request->products()->withCount(['responses' => function ($q) {
                    $q->where('company_responses.status', '=', 'open')->orWhere('company_responses.status', '=', 'awaits_for_closing');
                }])->get();

                foreach($responsesCount as $responseCount) {
                    $rCount += $responseCount->responses_count;
                }
            }

            return response()->json(['responses_count' => $rCount, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function getForUser() {
        $user = Auth::user();

        try {
            $requests = $user->requests()->get();
            $responses = [];
            foreach($requests as $request) {
                $products = $request->products()->get();

                foreach($products as $product) {
                    $responseList = $product->responses()
                        ->where('company_responses.status', '!=', 'rejected')
                        ->where('company_responses.status', '!=', 'closed')
                        ->with(['company', 'product', 'product.request'])
                        ->orderBy('id', 'desc')
                        ->get();

                    foreach($responseList as $response) {
                        $product = $response->product()->with('seed', 'product', 'fertiliser')->first();
                        $response['product_info'] = @$product;
                        $response['request'] = @$product->request;
                        unset($response['product']);
                        $responses[] = $response;
                    }
                }

            }
            return response()->json(['responses' => $responses, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function getForCompany() {
        $user = Auth::user();
        $company = $user->company;

        try {
            $responsesArr = [];
            $responses = $company
                ->responses()
                ->where('status', '!=', 'rejected')
                ->where('status', '!=', 'closed')
                ->with(['product', 'product.request'])
                ->orderBy('id', 'desc')
                ->get();

            foreach($responses as $response) {
                $product = $response->product()->with('seed', 'product', 'fertiliser')->first();
                $response['product_info'] = @$product;
                $response['request'] = @$product->request;
                unset($response['product']);
                $responsesArr[] = $response;
            }

            return response()->json(['responses' => $responsesArr, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function reject(Request $request) {
        $validator = Validator::make($request->all(), [
            'response_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $responseId = $request->get('response_id');

        try {
            $this->changeStatus($responseId, 'rejected');
            return response()->json(['message' => 'Предложение отклонено', 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function accept(Request $request) {
        $validator = Validator::make($request->all(), [
            'response_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $responseId = $request->get('response_id');

        try {
            $response = CompanyResponses::findOrFail($responseId);
            $this->changeStatus($responseId, 'accepted');

            OfferAccepted::dispatch($response->company->user, $response->product);
            return response()->json(['message' => 'Предложение принято', 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function sendToClose(Request $request) {
        $validator = Validator::make($request->all(), [
            'response_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $responseId = $request->get('response_id');

        try {
            $this->changeStatus($responseId, 'awaits_for_closing');
            return response()->json(['message' => 'Заявка на закрытие сделки отправлена', 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function close(Request $request) {
        $validator = Validator::make($request->all(), [
            'response_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $responseId = $request->get('response_id');

        try {
            $response = CompanyResponses::find($responseId);
            $product = $response->product;
            $this->changeStatus($responseId, 'closed');
            $product->status = 'closed';
            $product->save();
            return response()->json(['message' => 'Сделка закрыта', 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function getAcceptedResponsesAmount() {
        $user = Auth::user();
        $company = $user->company;

        try {
            $responsesAmount = $company->responses()->where('status', 'accepted')->count();
            return response()->json(['responses_amount' => $responsesAmount, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function getArchive(string $status)
    {
        try {
            $user = Auth::user();
            $company = $user->company;

            $responsesArr = [];
            if ($status === 'all') {
                $responses = $company
                    ->responses()
                    ->where('status', 'closed')
                    ->orWhere(function ($q) use ($company) {
                        $q->where('status', 'rejected')->where('company_id', $company->id);
                    })
                    ->with(['product', 'product.request'])
                    ->orderBy('id', 'desc')
                    ->get();
            } else {
                $responses = $company
                    ->responses()
                    ->where('status', $status)
                    ->where('company_id', $company->id)
                    ->with(['product', 'product.request'])
                    ->orderBy('id', 'desc')
                    ->get();
            }

            foreach($responses as $response) {
                $product = $response->product()->with('seed', 'product', 'fertiliser')->first();
                $response['product_info'] = @$product;
                $response['request'] = @$product->request;
                unset($response['product']);
                $responsesArr[] = $response;
            }

            return response()->json(['responses' => $responsesArr, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }




    private function changeStatus(int $responseId, string $newStatus):void {
        $response = CompanyResponses::findOrFail($responseId);
        $response->status = $newStatus;
        $response->save();
    }
}
