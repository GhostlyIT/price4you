<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'from', 'to', 'message', 'chat_id', 'read', 'theme'
    ];

    public function sender() {
        return $this->belongsTo('App\Models\User', 'from');
    }

    public function recipient() {
        return $this->belongsTo('App\Models\User', 'to');
    }
}
