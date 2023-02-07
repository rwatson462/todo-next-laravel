<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IssueNewLoginToken
{
    public function handle(Request $request, Closure $next, Response $response)
    {
        /** @var User $user */
        $user = auth()->user();
        if ($user) {
            $user->tokens()
                ->where('name', 'login')
                ->delete();
            $token = $user->createToken('login');
            $response->header('new-token', $token->plainTextToken);
        }
        return $next($request);
    }
}
