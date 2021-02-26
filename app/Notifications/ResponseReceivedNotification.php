<?php

namespace App\Notifications;

use App\Models\UserRequestsAndProducts;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class ResponseReceivedNotification extends Notification
{
    use Queueable;

    protected $request;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(UserRequestsAndProducts $request)
    {
        $this->request = $request;
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
        $productType = $this->request->product_type;
        return (new MailMessage)
                ->subject('Вам поступило предложение на сервисе Price4You')
                ->greeting('Здравствуйте!')
                ->line("Вам поступило предложение на Ваш запрос {$this->request->$productType->name} {$this->request->value} {$this->request->unit} от {$this->request->created_at}")
                ->action('Перейти на сайт', 'https://p4u.ecoplantagro.ru/')
                ->line('Покупайте выгоднее вместе с Price4You.');
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
