<?php


namespace App\Services;

use App\Models\Companies;
use App\Models\UserRequestsAndProducts;
use App\Notifications\CanBeDelayed;
use App\Notifications\RemindCompaniesNotification;
use Illuminate\Support\Carbon;

class CompaniesReminderService
{
    use CanBeDelayed;

    public function execute()
    {
        $now = Carbon::now();
        $companies = Companies::whereRaw("DATEDIFF('$now', `last_online`) >= 3")->get();
        $requestsAmount = UserRequestsAndProducts::whereRaw("DATEDIFF('$now', `created_at`) <= 3")->count();

        if ($requestsAmount > 3) {
            foreach ($companies as $company) {
                $delay = $this->getDelay();
                $user = $company->user;
                $user->notify((new RemindCompaniesNotification($requestsAmount)))->delay($delay);
            }
        }
    }
}
