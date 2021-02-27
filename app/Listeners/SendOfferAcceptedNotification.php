<?php

namespace App\Listeners;

use App\Events\OfferAccepted;
use App\Notifications\CanBeDelayed;
use App\Notifications\OfferAcceptedNotification;

class SendOfferAcceptedNotification
{
    use CanBeDelayed;

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
     * @param  OfferAccepted  $event
     * @return void
     */
    public function handle(OfferAccepted $event)
    {
        $receiver = $event->receiver;
        $request = $event->request;
        $delay = $this->getDelay();

        $receiver->notify((new OfferAcceptedNotification($request))->delay($delay));
    }
}
