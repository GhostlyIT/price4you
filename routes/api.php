<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::post('/forgot-password', 'App\Http\Controllers\AuthController@forgotPassword');
Route::post('/reset-password', 'App\Http\Controllers\AuthController@resetPassword');


//User
Route::middleware(['auth:api', 'auth.user'])->post('user/blacklist/remove', 'App\Http\Controllers\UserController@removeCompanyFromBlackList');
Route::middleware(['auth:api', 'auth.user'])->post('user/blacklist/add', 'App\Http\Controllers\UserController@addCompanyToBlackList');
Route::middleware(['auth:api', 'auth.user'])->get('user/options', 'App\Http\Controllers\OptionsController@getForUser');
Route::middleware('auth:api')->post('user/options/view/save', 'App\Http\Controllers\OptionsController@saveViewOption');
Route::middleware('auth:api')->get('user/contact-data', 'App\Http\Controllers\UserController@getContactData');
Route::middleware('auth:api')->post('user/edit', 'App\Http\Controllers\UserController@edit');
Route::middleware('auth:api')->post('user/avatar/change', 'App\Http\Controllers\UserController@changeAvatar');


//Company
Route::get('company/search', 'App\Http\Controllers\CompanyController@search');
Route::middleware(['auth:api', 'auth.company'])->get('company/options', 'App\Http\Controllers\OptionsController@getForCompany');
Route::middleware(['auth:api', 'auth.company'])->post('company/manufacture/add', 'App\Http\Controllers\CompanyController@addManufacture');
Route::middleware(['auth:api', 'auth.company'])->post('company/manufacture/remove', 'App\Http\Controllers\CompanyController@removeManufacture');
Route::middleware('auth:api')->get('company/info', 'App\Http\Controllers\CompanyController@getInfo');
Route::middleware(['auth:api', 'auth.company'])->post('company/edit', 'App\Http\Controllers\CompanyController@edit');
Route::middleware(['auth:api', 'auth.company'])->post('company/region/add', 'App\Http\Controllers\CompanyController@addRegion');
Route::middleware(['auth:api', 'auth.company'])->post('company/region/remove', 'App\Http\Controllers\CompanyController@deleteRegion');
Route::middleware(['auth:api', 'auth.company'])->post('company/product/add', 'App\Http\Controllers\CompanyController@addProduct');
Route::middleware(['auth:api', 'auth.company'])->post('company/product/remove', 'App\Http\Controllers\CompanyController@deleteProduct');


//Products
Route::get('product/search/all', 'App\Http\Controllers\ProductsController@searchAllProducts');
Route::get('product/class', 'App\Http\Controllers\ProductsController@getProductClass');
Route::get('product/rates-by-culture', 'App\Http\Controllers\ProductsController@getRatesByCulture');
Route::post('product/calculate-volume', 'App\Http\Controllers\ProductsController@calculateProductVolume');


//Manufactures
Route::get('manufacture/search', 'App\Http\Controllers\ManufactureController@search');


//Regions
Route::get('region/search', 'App\Http\Controllers\RegionController@search');


//Requests
Route::middleware(['auth:api', 'auth.user'])->post('request/save', 'App\Http\Controllers\RequestController@save');
Route::middleware(['auth:api', 'auth.user'])->get('request/get-for-user', 'App\Http\Controllers\RequestController@getForUser');
Route::middleware(['auth:api', 'auth.company'])->get('request/get-for-company', 'App\Http\Controllers\RequestController@getForCompany');
Route::middleware(['auth:api', 'auth.user', 'request.user'])->delete('request/{requestId}/delete', 'App\Http\Controllers\RequestController@delete');
Route::middleware('auth:api')->get('request/available-limit', 'App\Http\Controllers\RequestController@getAvailableLimit');
Route::middleware(['auth:api', 'auth.user'])->get('request/archive', 'App\Http\Controllers\RequestController@getArchive');
Route::middleware(['auth:api', 'auth.user'])->patch('request/{requestId}/repeat', 'App\Http\Controllers\RequestController@repeat');


//Responses
Route::middleware(['auth:api', 'auth.company'])->post('response/add', 'App\Http\Controllers\ResponseController@save');
Route::middleware(['auth:api', 'auth.user'])->get('response/count/all', 'App\Http\Controllers\ResponseController@getAllResponsesAmount');
Route::middleware(['auth:api', 'auth.user'])->get('response/user/all', 'App\Http\Controllers\ResponseController@getForUser');
Route::middleware(['auth:api', 'auth.company'])->get('response/company/all', 'App\Http\Controllers\ResponseController@getForCompany');
Route::middleware(['auth:api', 'auth.user', 'response.user'])->post('response/reject', 'App\Http\Controllers\ResponseController@reject');
Route::middleware(['auth:api', 'auth.user', 'response.user'])->post('response/accept', 'App\Http\Controllers\ResponseController@accept');
Route::middleware(['auth:api', 'auth.company', 'response.company'])->post('response/send-to-close', 'App\Http\Controllers\ResponseController@sendToCLose');
Route::middleware(['auth:api', 'auth.user', 'response.user'])->post('response/close', 'App\Http\Controllers\ResponseController@close');
Route::middleware(['auth:api', 'auth.company'])->get('response/accepted/amount', 'App\Http\Controllers\ResponseController@getAcceptedResponsesAmount');
Route::middleware(['auth:api', 'auth.company'])->get('response/archive/{status}', 'App\Http\Controllers\ResponseController@getArchive');

//Messages
Route::middleware('auth:api')->post('message/send', 'App\Http\Controllers\MessageController@send');
Route::middleware('auth:api')->get('message/chats', 'App\Http\Controllers\MessageController@getChats');
Route::middleware(['auth:api', 'chat.participation'])->get('message/all', 'App\Http\Controllers\MessageController@getMessagesForChat');
Route::middleware('auth:api')->get('message/count/all', 'App\Http\Controllers\MessageController@getUnreadMessagesCount');


//Emails
Route::get('email/verify/{id}', 'App\Http\Controllers\AuthController@verify')->name('verification.verify');
Route::get('email/resend', 'App\Http\Controllers\AuthCOntroller@resend')->name('verification.resend');


//Errors
Route::get('errorUnauthorized', function() {
    return response()->json(['message' => 'Не авторизован', 'status' => 'error'], 401);
})->name('unathorized');


//Deferred orders
Route::post('/deffered-order/save', 'App\Http\Controllers\DeferredOrderController@save');
Route::middleware(['auth:api', 'auth.user'])->post('/deferred-order/get', 'App\Http\Controllers\DeferredOrderController@findOrder');
