<?php

namespace App\Http\Controllers;

use App\Exceptions\ValidationException;
use App\Models\CompanyResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ResponseController extends Controller
{
    protected function failedValidation($validator)
    {
        throw new ValidationException($validator);
    }

    public function save(Request $request) {
        $validator = Validator::make($request->all(), [
            'request_id' => 'integer|required',
            'price' => 'integer|required|min:1',
            'comment' => 'string'
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
            CompanyResponses::create([
                'company_id' => $company->id,
                'request_id' => $requestId,
                'price' => $price,
                'comment' => $comment
            ]);
            return response()->json(['message' => 'Отклик успешно добавлен', 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage() . ' ' . $e->getFile() . ' ' . $e->getLine(), 'status' => 'error'],400);
        }
    }
}
