<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ViewOptions;

class OptionsController extends Controller
{
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

    //TODO: доделать запросы для опций компаний
    public function getForCompany() {
        try {
            $user = Auth::user();
            $viewOptions = ViewOptions::select('id', 'text_for_company')->get();

            return response()->json([
                'all_view_options' => $viewOptions,
                'selected_view_option' => $user->view_option_id,
                'status' => 'success'
            ],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'],400);
        }
    }
}
