<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RemindCompaniesNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $requestsAmount;

    /**
     * Create a new notification instance.
     *
     * @param int $requestsAmount
     */
    public function __construct(int $requestsAmount)
    {
        $this->requestsAmount = $requestsAmount;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Вам поступили запросы на сервисе Price4You')
            ->greeting('Здравствуйте!')
            ->line("За последнюю 3 дня на сервисе Price4You было создано $this->requestsAmount новых запросов.")
            ->action('Перейти на сайт', 'https://p4u.ecoplantagro.ru/')
            ->line('Продавайте больше вместе с Price4You.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
