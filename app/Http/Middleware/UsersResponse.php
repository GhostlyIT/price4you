<?php

namespace App\Http\Middleware;

use App\Models\CompanyResponses;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $userId = Auth::id();
        $responseId = $request->get('response_id');
        $responseUser = CompanyResponses::find($responseId)->product->request->user;

        if ($responseUser->id == $userId) return $next($request);
        return response()->json(['message' => 'Заявка не принадлежит текущему пользователю', 'status' => 'error'], 400);
    }
}
