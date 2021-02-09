<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserRequests;

class UsersRequest
{
    /**
     * Check if is this current users request
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $usersRequest = UserRequests::findOrFail($request->route('requestId'));
        if ($user->id == $usersRequest->user_id) return $next($request);
        return response()->json(['q' => $request, 'message' => 'Этот запрос не принадлежит текущему польователю', 'status' => 'error'], 400);
    }
}
