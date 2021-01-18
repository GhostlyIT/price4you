<?php

namespace App\Http\Controllers;

use App\Exceptions\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ViewOptions;
use Illuminate\Support\Facades\Validator;

class OptionsController extends Controller
{
    protected function failedValidation($validator)
    {
        throw new ValidationException($validator);
    }

    public function getForUser() {
        try {
            $user = Auth::user();
            $viewOptions = ViewOptions::select('id', 'text_for_user')->get();
            $blackList = $user->blackList()->with('company')->get();
            return response()->json([
                'all_view_options' => $viewOptions,
                'selected_view_option' => $user->view_option_id,
                'black_list' => $blackList,
                'status' => 'success'
            ],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function getForCompany() {
        try {
            $user = Auth::user();
            $company = $user->company;
            $viewOptions = ViewOptions::select('id', 'text_for_company')->get();
            $manufactures = [];
            $manufactureMiddlewares = $company->manufacturesMiddleware()->get();
            foreach($manufactureMiddlewares as $manufactureMiddleware) {
                $manufactures[] = $manufactureMiddleware->manufacture;
            }
            return response()->json([
                'all_view_options' => $viewOptions,
                'selected_view_option' => $user->view_option_id,
                'manufactures' => $manufactures,
                'status' => 'success'
            ],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function saveViewOption(Request $request) {
        $validator = Validator::make($request->all(), [
            'option_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $user = Auth::user();
        $optionId = $request->get('option_id');

        try {
            $user->view_option_id = $optionId;
            $user->save();
            return response()->json(['status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }
}
