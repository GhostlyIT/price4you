<?php

namespace App\Listeners;

use App\Events\ResponseReceived;
use App\Mail\ResponseReceivedMail;
use App\Notifications\ResponseReceivedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendResponseReceivedNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

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

        $receiver->notify(new ResponseReceivedNotification($request));
    }
}
