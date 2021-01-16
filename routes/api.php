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
Route::middleware(['auth:api', 'auth.user'])->post('user/blacklist/remove', 'App\Http\Controllers\UserController@removeCompanyFromBlackList');
Route::middleware(['auth:api', 'auth.user'])->post('user/blacklist/add', 'App\Http\Controllers\UserController@addCompanyToBlackList');
Route::middleware(['auth:api', 'auth.user'])->get('user/options', 'App\Http\Controllers\OptionsController@getForUser');
Route::middleware(['auth:api', 'auth.user'])->post('user/options/view/save', 'App\Http\Controllers\OptionsController@saveViewOption');


//Company
Route::get('company/search', 'App\Http\Controllers\CompanyController@search');


//Products
Route::get('product/search/all', 'App\Http\Controllers\ProductsController@searchAllProducts');
Route::get('product/class', 'App\Http\Controllers\ProductsController@getProductClass');
Route::get('product/rates-by-culture', 'App\Http\Controllers\ProductsController@getRatesByCulture');
Route::post('product/calculate-volume', 'App\Http\Controllers\ProductsController@calculateProductVolume');


//Requests
Route::middleware(['auth:api', 'auth.user'])->post('request/save', 'App\Http\Controllers\RequestController@save');
Route::middleware(['auth:api', 'auth.user'])->get('request/get-for-user', 'App\Http\Controllers\RequestController@getForUser');
Route::middleware(['auth:api', 'auth.company'])->get('request/get-for-company', 'App\Http\Controllers\RequestController@getForCompany');


//Responses
Route::middleware(['auth:api', 'auth.company'])->post('response/add', 'App\Http\Controllers\ResponseController@save');
Route::middleware(['auth:api', 'auth.user'])->get('response/count/all', 'App\Http\Controllers\ResponseController@getAllResponsesAmount');
Route::middleware(['auth:api', 'auth.user'])->get('response/user/all', 'App\Http\Controllers\ResponseController@getForUser');
Route::middleware(['auth:api', 'auth.user', 'response.user'])->post('response/reject', 'App\Http\Controllers\ResponseController@reject');

//Messages
Route::middleware('auth:api')->post('message/send', 'App\Http\Controllers\MessageController@send');
Route::middleware('auth:api')->get('message/chats', 'App\Http\Controllers\MessageController@getChats');
Route::middleware(['auth:api', 'chat.participation'])->get('message/all', 'App\Http\Controllers\MessageController@getMessagesForChat');
Route::middleware('auth:api')->get('message/count/all', 'App\Http\Controllers\MessageController@getUnreadMessagesCount');


//Errors
Route::get('errorUnauthorized', function() {
    return response()->json(['message' => 'Не авторизован', 'status' => 'error'], 401);
})->name('unathorized');
