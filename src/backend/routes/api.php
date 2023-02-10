<?php

use App\Http\Controllers\Auth\CheckController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\TodoGroupController;
use App\Models\Todo;
use Illuminate\Support\Facades\Route;

Route::middleware('apikey')->group(function() {
    Route::prefix('auth')->group(function () {
        Route::put('register', [RegisterController::class, 'register']);
        Route::post('login', [LoginController::class, 'login']);
        Route::middleware(['auth:sanctum', 'last-active'])->post('check', [CheckController::class, 'check']);
    });

    Route::middleware(['auth:sanctum', 'last-active'])->group(function() {
        Route::prefix('groups')->group(function() {
            Route::get('/', [TodoGroupController::class, 'get']);
        });
        Route::get('/todos/{group}', [TodoController::class, 'getByGroup']);
        Route::prefix('todo')->group(function () {
            Route::get('/', [TodoController::class, 'all']);
            Route::put('/', [TodoController::class, 'create']);
            Route::post('/{todo}/complete', [TodoController::class, 'complete']);
            Route::post('/{todo}/uncomplete', [TodoController::class, 'uncomplete']);
        });
    });
});
