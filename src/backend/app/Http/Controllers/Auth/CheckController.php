<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CheckController extends Controller
{
    public function check()
    {
        // This endpoint is behind an Auth wall so we can safely do this
        $user = auth()->user();
        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
        ];
    }
}
