<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $input = $request->validate([
            'name' => 'required',
            'emailAddress' => 'required|email|unique:users,email',
            'password' => 'required|min:8'
        ]);

        $password = Hash::make($input['password']);

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['emailAddress'],
            'password' => $password,
            'last_active_at' => now(),
        ]);

        $token = $user->createToken('login');

        return [
            'token' => $token->plainTextToken,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
        ];
    }
}
