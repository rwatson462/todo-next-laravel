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

        if (!auth()->attempt(['email' => $validated['emailAddress'], 'password' => $validated['password']])) {
            return response('Invalid Username/Password combination', 422);
        }

        /** @var User $user */
        $user = auth()->user();

        // Delete any non-expired login tokens
        $user->tokens()
            ->where('name', 'login')
            ->where('expires_at', '>', now())
            ->delete();

        // Create a new login token
        $token = $user->createToken(name: 'login');

        // Update last active time
        $user->update(['last_active_at' => now()]);

        return [
            'token' => $token->plainTextToken,
            'user' => [
                'id' => $user->id,
                'name' => $user->name
            ]
        ];
    }
}
