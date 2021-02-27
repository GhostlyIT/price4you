<?php

namespace App\Listeners;

use App\Events\ResponseReceived;
use App\Notifications\CanBeDelayed;
use App\Notifications\ResponseReceivedNotification;

class SendResponseReceivedNotification
{
    use CanBeDelayed;

    /**
     * Handle the event.
     *
     * @param  ResponseReceived  $event
     * @return void
     */
    public function handle(ResponseReceived $event)
    {
        $receiver = $event->receiver;
        $request = $event->request;
        $delay = $this->getDelay();

        $receiver->notify((new ResponseReceivedNotification($request))->delay($delay));
    }
}
