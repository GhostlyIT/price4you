<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Auth
Route::post('register', 'App\Http\Controllers\AuthController@register');
Route::post('login', 'App\Http\Controllers\AuthController@login');


//User
Route::middleware('auth:api')->post('user/blacklist/remove', 'App\Http\Controllers\UserController@removeCompanyFromBlackList');
Route::middleware('auth:api')->post('user/blacklist/add', 'App\Http\Controllers\UserController@addCompanyToBlackList');


//Company
Route::get('company/search', 'App\Http\Controllers\CompanyController@search');


//Products
Route::get('product/search/all', 'App\Http\Controllers\ProductsController@searchAllProducts');
Route::get('product/class', 'App\Http\Controllers\ProductsController@getProductClass');
Route::get('product/rates-by-culture', 'App\Http\Controllers\ProductsController@getRatesByCulture');
Route::post('product/calculate-volume', 'App\Http\Controllers\ProductsController@calculateProductVolume');


//Requests
Route::middleware('auth:api')->post('request/save', 'App\Http\Controllers\RequestController@save');
Route::middleware('auth:api')->get('request/get-for-user', 'App\Http\Controllers\RequestController@getForUser');
Route::middleware('auth:api')->get('request/get-for-company', 'App\Http\Controllers\RequestController@getForCompany');


//Responses
Route::middleware('auth:api')->post('response/add', 'App\Http\Controllers\ResponseController@save');


//Options
Route::middleware('auth:api')->get('options/user', 'App\Http\Controllers\OptionsController@getForUser');


// Errors
Route::get('errorUnauthorized', function() {
    return response()->json(['message' => 'Не авторизован', 'status' => 'error'], 401);
})->name('unathorized');
