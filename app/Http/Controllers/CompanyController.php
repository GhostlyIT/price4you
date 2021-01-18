<?php

namespace App\Http\Controllers;

use App\Models\CompanyManufactures;
use Illuminate\Http\Request;
use App\Exceptions\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Companies;

class CompanyController extends Controller
{
    protected function failedValidation($validator)
    {
        throw new ValidationException($validator);
    }


    public function search(Request $request) {
        $validator = Validator::make($request->all(), [
            'query' => 'min:1'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $query = $request->get('query');

        try {
            $companies = Companies::where('company_name', 'like', "%$query%")->orderBy('company_name')->with('user:id,phone_number')->get();
            return response()->json(['companies' => $companies, 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function addManufacture(Request $request) {
        $validator = Validator::make($request->all(), [
            'manufacture_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $manufactureId = $request->get('manufacture_id');

        $user = Auth::user();
        $company = $user->company;

        try {
            CompanyManufactures::create([
                'company_id' => $company->id,
                'manufacture_id' => $manufactureId
            ]);
            return response()->json(['message' => 'Производитель добавлен', 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function removeManufacture(Request $request) {
        $validator = Validator::make($request->all(), [
            'manufacture_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $manufactureId = $request->get('manufacture_id');

        $user = Auth::user();
        $company = $user->company;

        try {
            CompanyManufactures::where('company_id', $company->id)->where('manufacture_id', $manufactureId)->delete();
            return response()->json(['message' => 'Производитель удален', 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function getInfo(Request $request) {
        $validator = Validator::make($request->all(), [
            'company_id' => 'integer'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $user = Auth::user();
        $company = $user->company;

        $companyId = $company->id;

        if ($request->has('company_id')) $companyId = $request->get('company_id');

        try {
            $companyInfo = Companies::find($companyId);
            return response()->json(['company' => $companyInfo, 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function edit(Request $request) {
        $validator = Validator::make($request->all(), [
            'company_name' => 'required|max:32',
            'director' => 'required|string|max:32',
            'address' => 'required',
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $companyName = $request->get('company_name');
        $director = $request->get('director');
        $address = $request->get('address');
        $email = $request->get('email');
        $about = null;

        if ($request->has('about') && $request->get('about') != '') $about = $request->get('about');

        $user = auth::user();
        $company = $user->company;

        try {
            $company->company_name = $companyName;
            $company->company_address = $address;
            $company->email = $email;
            $company->director = $director;
            $company->about = $about;
            $company->save();

            $user->company = $user->company;
            return response()->json(['user' => $user, 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }
}
