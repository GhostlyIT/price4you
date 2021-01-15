<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_1', 'user_2'
    ];

    protected $hidden = [
      'created_at', 'updated_at'
    ];

    public function messages() {
        return $this->hasMany('App\Models\Message', 'chat_id');
    }

    public function user1() {
        return $this->belongsTo('App\Models\User', 'user_1');
    }

    public function user2() {
        return $this->belongsto('App\Models\User', 'user_2');
    }
}
