<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Exceptions\ValidationException;

use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Auth;

use App\Models\CompanyResponses;

class CompanyController extends Controller
{
    protected function failedValidation($validator)
    {
        throw new ValidationException($validator);
    }

    public function saveNewResponse(Request $request) {
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
