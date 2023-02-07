<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckAPIKey
{
    public function handle(Request $request, Closure $next)
    {
        $key = $request->header('apikey');
        if (!$key) {
            return response('No API key given', 401);
        }

        if ($key !== env('API_KEY')) {
            return response('Invalid API key given', 401);
        }

        return $next($request);
    }
}
