<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('welcome');
})->name('home');
Route::any('{query}',
    function() { return redirect('/'); })
    ->where('query', '.*');

Route::get('/#/reset-password/{token}', function ($token) {
    return redirect('http://localhost:8000/#/reset-password/'.$token);
})->name('password.reset');

