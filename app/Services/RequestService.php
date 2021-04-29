<?php


namespace App\Services;


use App\Models\UserRequestsAndProducts;
use Illuminate\Support\Carbon;

class RequestService
{
    public static function cleanUpRequestsAndResponsesByDays(int $days): void
    {
        $requests = UserRequestsAndProducts::all();
        foreach ($requests as $request) {
            $diffInDays = Carbon::parse($request->created_at)->diffInDays(Carbon::now());
            if ($diffInDays >= $days) {
                $request->status = 'closed';
                $request->save();
                $request->responses()->update(['status' => 'rejected']);
            }
        }
    }
}
