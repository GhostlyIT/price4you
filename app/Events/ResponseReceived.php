<?php

namespace App\Events;

use App\Models\UserRequestsAndProducts;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class ResponseReceived
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $receiver;
    public $request;

    /**
     * Create a new event instance.
     *
     * @param User $receiver
     * @param UserRequestsAndProducts $request
     */
    public function __construct(User $receiver, UserRequestsAndProducts $request)
    {
        $this->receiver = $receiver;
        $this->request = $request;
    }
}
