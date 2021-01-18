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
}
