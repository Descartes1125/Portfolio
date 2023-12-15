<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\ProductController;
use App\Http\Controllers\HomeController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


    Route::get("/",[ProductController::class, "index"])->name("top");
    Route::get('/search', [ProductController::class, 'search'])->name('search');

    Route::group(['middleware' => ['auth']], function () {
        Route::get('/home', [HomeController::class, 'index'])->name('home');
        //Create
        Route::get('/create',[ProductController::class,"create"])->name('products.create');
        Route::post('/store',[ProductController::class,"store"])->name('products.store');
        //Read
        Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        //Update
        Route::patch('/{product}/update', [ProductController::class, 'update'])->name('products.update');
        //Destroy
        Route::delete('/{product}/delete',[ProductController::class,'destroy'])->name('products.delete');
    });