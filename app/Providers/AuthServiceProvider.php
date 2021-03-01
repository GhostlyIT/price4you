<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\HtmlString;
use Laravel\Passport\Passport;
use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();

        VerifyEmail::toMailUsing(function (User $user, string $verificationUrl) {
            return (new MailMessage)
                ->subject('Успешная регистрация на сервисе Price4You')
                ->line(new HtmlString('Поздравляем! Вы всего в одном шаге от использования сервиса Price4You. Для активации вашего аккаунта нажмите на кнопку ниже или перейдите по ссылке: <a href="' . $verificationUrl . '">' . $verificationUrl . '</a>'))
                ->action('Активировать аккаунт', $verificationUrl)
                ->line($user->account_type == 'user' ? 'Покупайте выгоднее вместе с Price4You.' : 'Продавайте больше вместе с Price4You.');
        });

        ResetPassword::createUrlUsing(function ($user, string $token) {
            return config('app.url').'/#/reset-password/'.$token.'?email='.$user->email;
        });
    }
}
