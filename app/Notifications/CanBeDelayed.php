<?php


namespace App\Notifications;


use Carbon\Carbon;

trait CanBeDelayed
{
    public function getDelay() {
        $delay = now();

        $time = Carbon::now();
        $start = Carbon::create($time->year, $time->month, $time->day, 8, 0, 0);
        $end = Carbon::create($time->year, $time->month, $time->day, 21, 0, 0);

        if (!$time->isBetween($start, $end)) {
            if ($time->lessThan($start)) {
                $delay = $start;
            }
            if ($time->greaterThan($end)) {
                $nextMorning = Carbon::create($time->year, $time->month, $time->addDay()->day, 8, 0, 0);
                if (Carbon::now()->isLastOfMonth()) $nextMorning = $nextMorning->addMonth();
                $delay = $nextMorning;
            }
        }

        return $delay;
    }
}
