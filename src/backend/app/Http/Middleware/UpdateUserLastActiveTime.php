<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UpdateUserLastActiveTime
{
    public function handle(Request $request, Closure $next)
    {
        /** @var User $user */
        $user = auth()->user();
        if ($user) {
            if ($user->last_active_at < now()->subMinutes(30)) {
                return response('Inactive session', 401);
            }
            $user->update(['last_active_at', now()]);
        }
        return $next($request);
    }
}
