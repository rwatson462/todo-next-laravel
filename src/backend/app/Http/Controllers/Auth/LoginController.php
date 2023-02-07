<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'emailAddress' => 'required|exists:users,email',
            'password' => 'required'
        ]);

        if (auth()->attempt(['email' => $validated['emailAddress'], 'password' => $validated['password']])) {
            /** @var User $user */
            $user = auth()->user();

            // Delete any non-expired login tokens
            $user->tokens()
                ->where('name', 'login')
                ->where('expires_at', '>', now())
                ->delete();

            // Create a new login token
            $token = $user->createToken(name: 'login', expiresAt: now()->addMinutes(30));

            return [
                'token' => $token->plainTextToken,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name
                ]
            ];
        }

        return response('Invalid Username/Password combination', 422);
    }
}
