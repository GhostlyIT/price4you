<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exceptions\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Companies;

class AuthController extends Controller
{
    protected function failedValidation($validator) {
        throw new ValidationException($validator);
    }

    protected $allowedAccountTypes = [
        'company',
        'user'
    ];

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:32',
            'surname' => 'required|string|max:32',
            'phone_number' => 'required|regex:/\+7\([0-9]{3}\)-[0-9]{3}-[0-9]{2}-[0-9]{2}/',
            'password' => 'required|min:8',
            'account_type' => 'required|string|in:' . implode(',', $this->allowedAccountTypes),
            'company_name' => 'required_if:account_type,company|string',
            'company_address' => 'required_if:account_type,company|string',
            'email' => 'required_if:account_type,company|email',
            'director' => 'required_if:account_type,company|string|max:32'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $newUser = [
            'name' => $request->input('name'),
            'surname' => $request->input('surname'),
            'phone_number' => $request->input('phone_number'),
            'password' => bcrypt($request->input('password')),
            'account_type' => $request->get('account_type')
        ];

        try {
            $user = User::create($newUser);
            $token = $user->createToken('access_token')->accessToken;
            if ($user->account_type === 'company') {
                $newCompany = [
                    'user_id' => $user->id,
                    'company_name' => $request->input('company_name'),
                    'company_address' => $request->input('company_address'),
                    'email' => $request->input('email'),
                    'director' => $request->input('director')
                ];
                Companies::create($newCompany);
            }
            return response()->json(['message' => 'Аккаунт успешно зарегистрирован', 'status' => 'success', 'token' => $token, 'user_data' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 401);
        }
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'phone_number' => 'required|regex:/\+7\([0-9]{3}\)-[0-9]{3}-[0-9]{2}-[0-9]{2}/',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $phoneNumber = $request->input('phone_number');
        $password = $request->input('password');

        try {
            Auth::attempt(['phone_number' => $phoneNumber, 'password' => $password]);
            $user = Auth::user();
            if ($user === null) throw new \Exception("Ошибка входа");
            $token = $user->createToken('access_token')->accessToken;
            return response()->json(['message' => 'Вход выполнен успешно', 'status' => 'success', 'token' => $token, 'user_data' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 401);
        }
    }
}
