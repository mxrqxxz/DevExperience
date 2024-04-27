<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ComprobarTipoUsuario
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $type): Response
    {
        $user = Auth::user();

        $email = $user->email;
        $domain = $type === 'profesor' ? 'murciaeduca' : 'alu.murciaeduca';

        if (!(str_ends_with($email, '@' . $domain . '.es'))) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        return $next($request);
    }
}
