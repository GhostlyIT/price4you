<?php

namespace App\Http\Middleware;

use App\Models\CompanyResponses;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompanysResponse
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
        $user = Auth::user();
        $responseId = $request->get('response_id');
        $response = CompanyResponses::find($responseId);
        if ($user->company->id == $response->company_id) return $next($request);
        return response()->json(['message' => 'Заявка не принадлежит компании', 'status' => 'error'], 400);
    }
}
