<?php

namespace App\Http\Controllers;

use App\Exceptions\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Manufacture;

class ManufactureController extends Controller
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
            $manufactures = Manufacture::where('name_manufacture_rus', 'like', "%$query%")->orderBy('name_manufacture_rus')->get();
            return response()->json(['manufactures' => $manufactures, 'status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }

}
