<?php

namespace App\Http\Controllers;

use App\Exceptions\ValidationException;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Message;

class MessageController extends Controller
{
    protected function failedValidation($validator)
    {
        throw new ValidationException($validator);
    }

    public function send(Request $request) {
        $validator = Validator::make($request->all(), [
            'recipient_id' => 'integer|required',
            'message' => 'string|min:1|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $userId = Auth::id();
        $recipientId = $request->get('recipient_id');
        $message = $request->get('message');

        try {
            $chat = Chat::select('id')->where('user_1', $userId)->where('user_2', $recipientId)->orWhere('user_2', $userId)->where('user_1', $recipientId)->first();

            if ($chat == null)
                $chat = Chat::create(['user_1' => $userId, 'user_2' => $recipientId]);

            Message::create([
               'from' => $userId,
               'to' => $recipientId,
               'chat_id' => $chat->id,
               'message' => $message
            ]);

            return response()->json(['message' => 'Сообщение отправлено', 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }

    public function getChats() {
        $userId = Auth::id();
        try {
            $chats = Chat::where('user_1', $userId)
                ->orWhere('user_2', $userId)
                ->with([
                    'messages' => function($query) {
                        $query->orderBy('id', 'desc')->first();
                    }
                ])
                ->get();
            return response()->json(['chats' => $chats, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }

    public function getMessagesForChat(Request $request) {
        $validator = Validator::make($request->all(), [
            'chat_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $chatId = $request->get('chat_id');

        try {
            $messages = Chat::findOrFail($chatId)->messages()->get();
            return response()->json(['messages' => $messages, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }
}
