<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

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
        'account_type'
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


}
