<?php

namespace App\Http\Controllers;

use App\Models\CompanyManufactures;
use App\Models\CompanyRegions;
use Illuminate\Http\Request;
use App\Exceptions\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Companies;
use Image;

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

    public function addRegion(Request $request) {
        $validator = Validator::make($request->all(), [
            'region_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $user = Auth::user();
        $company = $user->company;
        $regionId = $request->get('region_id');

        try {
            CompanyRegions::create([
                'company_id' => $company->id,
                'region_id' => $regionId
            ]);
            return response()->json(['message' => 'Регион добавлен', 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

    public function deleteRegion(Request $request) {
        $validator = Validator::make($request->all(), [
            'region_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $user = Auth::user();
        $company = $user->company;
        $regionId = $request->get('region_id');

        try {
            CompanyRegions::where('company_id', $company->id)->where('region_id', $regionId)->delete();
            return response()->json(['message' => 'Регион удален', 'status' => 'success'], 200);
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
        $user = auth::user();
        $company = $user->company;

        $validator = Validator::make($request->all(), [
            'company_name' => 'max:32',
            'director' => 'string|max:32',
            'address' => '',
            'director_email' => 'email|unique:App\Models\Companies,email,' . $company->id,
            'email' => 'email|unique:App\Models\User,email,' . $user->id
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $companyName = $request->get('company_name');
        $director = $request->get('director');
        $address = $request->get('address');
        $email = $request->get('director_email');
        $about = null;

        if ($request->has('about') && $request->get('about') != '') $about = $request->get('about');


        try {
            if ($request->has('company_name')) {
                $company->company_name = $companyName;
                $company->company_address = $address;
                $company->email = $email;
                $company->director = $director;
                $company->about = $about;
                $company->save();
            }

            if ($request->has('email')) {
                $user->email = $request->get('email');
                $user->save();
            }

            $user->company = $user->company;
            return response()->json(['user' => $user, 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }
}
