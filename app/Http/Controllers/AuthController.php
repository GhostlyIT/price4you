<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exceptions\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Companies;
use Illuminate\Auth\Events\Registered;

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
            'email' => 'required|email|unique:App\Models\User',
            'name' => 'required|string|max:32',
            'surname' => 'required|string|max:32',
            'phone_number' => 'required|regex:/\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}/|unique:App\Models\User',
            'password' => 'required|min:8',
            'account_type' => 'required|string|in:' . implode(',', $this->allowedAccountTypes),
            'company_name' => 'required_if:account_type,company|string',
            'company_address' => 'required_if:account_type,company|string',
            'director_email' => 'required_if:account_type,company|email',
            'director' => 'required_if:account_type,company|string|max:32'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $newUser = [
            'email' => $request->input('email'),
            'name' => $request->input('name'),
            'surname' => $request->input('surname'),
            'phone_number' => $request->input('phone_number'),
            'password' => bcrypt($request->input('password')),
            'account_type' => $request->get('account_type')
        ];

        DB::beginTransaction();
        try {
            $user = User::create($newUser);
            $token = $user->createToken('access_token')->accessToken;
            if ($user->account_type === 'company') {
                $newCompany = [
                    'user_id' => $user->id,
                    'company_name' => $request->input('company_name'),
                    'company_address' => $request->input('company_address'),
                    'email' => $request->input('director_email'),
                    'director' => $request->input('director')
                ];
                $user->company = Companies::create($newCompany);
            }

            event(new Registered($user));

            DB::commit();

            return response()->json(['message' => 'Аккаунт успешно зарегистрирован', 'status' => 'success', 'token' => $token, 'user_data' => $user], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            if ($e->getCode() == 23000) {
                return response()->json(['message' => 'такой номер телефона уже зарегистрирован', 'status' => 'error'], 401);
            }
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 401);
        }
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        try {
            Auth::attempt($request->only('email', 'password'));
            $user = Auth::user();
            if ($user === null) throw new \Exception("Ошибка входа");
            $token = $user->createToken('access_token')->accessToken;
            $user->company = $user->company;
            return response()->json(['message' => 'Вход выполнен успешно', 'status' => 'success', 'token' => $token, 'user_data' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 401);
        }
    }

    public function verify($user_id, Request $request) {
        if (!$request->hasValidSignature()) {
            return response()->json(["msg" => "Invalid/Expired url provided."], 401);
        }

        $user = User::findOrFail($user_id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        return redirect()->to('/');
    }

    public function resend() {
        if (auth()->user()->hasVerifiedEmail()) {
            return response()->json(["msg" => "Email already verified."], 400);
        }

        auth()->user()->sendEmailVerificationNotification();

        return response()->json(["msg" => "Email verification link sent on your email id"]);
    }
}
