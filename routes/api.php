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

//User
Route::post('register', 'App\Http\Controllers\AuthController@register');
Route::post('login', 'App\Http\Controllers\AuthController@login');

//Products
Route::get('product/search/all', 'App\Http\Controllers\ProductsController@searchAllProducts');
Route::get('product/class', 'App\Http\Controllers\ProductsController@getProductClass');
Route::get('product/rates-by-culture', 'App\Http\Controllers\ProductsController@getRatesByCulture');
Route::post('product/calculate-volume', 'App\Http\Controllers\ProductsController@calculateProductVolume');

//Requests
Route::middleware('auth:api')->post('request/save', 'App\Http\Controllers\RequestController@save');

// Errors
Route::get('errorUnauthorized', function() {
    return response()->json(['message' => 'Не авторизован', 'status' => 'error'], 401);
})->name('unathorized');
