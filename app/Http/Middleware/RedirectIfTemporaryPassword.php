<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;

use Inertia\Inertia;

class RedirectIfTemporaryPassword
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Hash::check(config('auth.password_default'), $request->user()->password)) {
            return Inertia::location(route($request->user()->routes['auth.change-password']));
        }

        return $next($request);
    }
}
