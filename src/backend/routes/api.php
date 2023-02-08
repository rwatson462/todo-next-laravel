<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\TodoController;
use App\Models\Todo;
use Illuminate\Support\Facades\Route;

Route::middleware('apikey')->group(function() {
    Route::prefix('auth')->group(function () {
        Route::put('register', [RegisterController::class, 'register']);
        Route::post('login', [LoginController::class, 'login']);
    });

    Route::middleware(['auth:sanctum', 'last-active'])->prefix('todo')->group(function () {
        Route::get('/', fn() => Todo::where('created_by', auth()->user()->id)->get());
        Route::put('/', [TodoController::class, 'create']);
        Route::post('/{todo}/complete', [TodoController::class, 'complete']);
        Route::post('/{todo}/uncomplete', [TodoController::class, 'uncomplete']);
    });
});
