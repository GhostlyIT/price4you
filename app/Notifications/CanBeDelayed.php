<?php


namespace App\Notifications;


use Carbon\Carbon;

trait CanBeDelayed
{
    public function getDelay() {
        $delay = now();

        $time = Carbon::now('Europe/Moscow');
        $start = Carbon::create($time->year, $time->month, $time->day, 8, 0, 0, 'Europe/Moscow');
        $end = Carbon::create($time->year, $time->month, $time->day, 21, 0, 0, 'Europe/Moscow');

        if (!$time->between($start, $end)) {
            if ($time < $start) {
                $delay = $start;
            }
            if ($time > $end) {
                $nextMorning = Carbon::create($time->year, $time->month, $time->addDay()->day, 8, 0, 0, 'Europe/Moscow');
                $delay = $nextMorning;
            }
        }

        return $delay;
    }
}
