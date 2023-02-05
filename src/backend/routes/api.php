<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\Auth\RegisterController;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::put('register', [RegisterController::class, 'register']);

Route::prefix('todo')->group(function() {
    Route::get('/', fn() => Todo::all());
    Route::put('/', [TodoController::class, 'create']);
    Route::post('/{todo}/complete', [TodoController::class, 'complete']);
    Route::post('/{todo}/uncomplete', [TodoController::class, 'uncomplete']);
});
