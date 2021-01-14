<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Chat;

class CheckChatParticipation
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
        $chatId = $request->get('chat_id');
        $chat = Chat::where('id', $chatId)->where('user_1', $userId)->orWhere('user_2', $userId)->where('id', $chatId)->first();

        if ($chat != null) return $next($request);
        return response()->json(['message' => 'Нет доступа к чату', 'status' => 'error'], 400);
    }
}
