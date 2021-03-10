<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail, CanResetPassword
{
    use HasFactory, Notifiable, HasApiTokens, \Illuminate\Auth\Passwords\CanResetPassword;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'name',
        'surname',
        'password',
        'phone_number',
        'account_type',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    public function company() {
        return $this->hasOne('App\Models\Companies');
    }

    public function requests() {
        return $this->hasMany('App\Models\UserRequests');
    }

    public function viewOption() {
        return $this->belongsTo('App\Models\ViewOptions');
    }

    public function blackList() {
        return $this->hasMany('App\Models\UserBlackList');
    }

    public function sendPasswordResetNotification($token) {
        $url = config('app.url').'/#/reset-password/'.$token.'?email='.$this->email;

        $this->notify(new ResetPasswordNotification($url));
    }

    public function requestLimits() {
        return $this->hasOne('App\Models\RequestLimit');
    }
}
