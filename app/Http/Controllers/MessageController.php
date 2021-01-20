<?php

namespace App\Http\Controllers;

use App\Exceptions\ValidationException;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $theme = null;

        if ($request->has('theme'))
            $theme = $request->get('theme');

        try {
            $chat = Chat::select('id')->where('user_1', $userId)->where('user_2', $recipientId)->orWhere('user_2', $userId)->where('user_1', $recipientId)->first();

            if ($chat == null)
                $chat = Chat::create(['user_1' => $userId, 'user_2' => $recipientId]);

            Message::create([
                'from'      => $userId,
                'to'        => $recipientId,
                'chat_id'   => $chat->id,
                'message'   => $message,
                'theme'     => $theme
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
                    },
                    'user1' => function($query) {
                        $query->with('company');
                    },
                    'user2' => function($query) {
                        $query->with('company');
                    }
                ])
                ->withCount([
                    'messages' => function($query) {
                        $userId = Auth::id();
                        $query->where('to', $userId)->where('read', 0);
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
        $userId = Auth::id();

        try {
            $messages = Chat::findOrFail($chatId)->messages()->with('sender', 'sender.company')->get();
            DB::table('messages')->where('chat_id', $chatId)->where('to', $userId)->update(['read' => 1]);
            return response()->json(['messages' => $messages, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }

    public function getUnreadMessagesCount(Request $request) {
        $validator = Validator::make($request->all(), [
            'chat_id' => 'integer'
        ]);

        if ($validator->fails()) {
            $this->failedValidation($validator);
        }

        $userId = Auth::id();
        $chatId = null;

        if ($request->has('chat_id')) $chatid = $request->get('chat_id');

        try {
            if ($chatId == null) {
                $messagesCount = Message::where('to', $userId)->where('read', 0)->get()->count();
            } else {
                $messagesCount = Message::where('to', $userId)->where('read', 0)->where('chat_id', $chatId)->get()->count();
            }
            return response()->json(['unread_messages_count' => $messagesCount, 'status' => 'success'],200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 400);
        }
    }
}
