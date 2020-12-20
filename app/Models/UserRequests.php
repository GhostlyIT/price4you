<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRequests extends Model
{
    use HasFactory;

    protected $fillable = [
      'title', 'user_id', 'payment_method', 'delivery_method', 'comment', 'delivery_address'
    ];

    public function user() {
        return $this->belongsTo('App\Models\User');
    }

    public function products() {
        return $this->hasMany('App\Models\UserRequestsAndProducts');
    }
}
