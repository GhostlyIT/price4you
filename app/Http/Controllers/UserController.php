<?php

namespace App\Http\Controllers;

use App\Exceptions\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\UserBlackList;
use App\Models\User;

class UserController extends Controller
{
    protected function failedValidation($validator)
    {
        throw new ValidationException($validator);
    }


    public function getContactData(Request $request) {
        $validator = Validator::make($request->all(), [
            'user_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $userId = $request->get('user_id');

        try {
            $contactData = User::findOrFail($userId)->select('name', 'surname', 'phone_number')->first();
            return response()->json(['contact_data' => $contactData, 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }


    public function addCompanyToBlackList(Request $request) {
        $validator = Validator::make($request->all(), [
            'company_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $userId = Auth::id();
        $companyId = $request->get('company_id');

        try {
            UserBlackList::create([
                'user_id' => $userId,
                'company_id' => $companyId
            ]);
            return response()->json(['message' => 'Компания добавлена в черный список', 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }


    public function removeCompanyFromBlackList(Request $request) {
        $validator = Validator::make($request->all(), [
            'company_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $userId = Auth::id();
        $companyId = $request->get('company_id');

        try {
            UserBlackList::where('user_id', $userId)->where('company_id', $companyId)->delete();
            return response()->json(['message' => 'Удаление из черного списка прошло успешно', 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }
}
