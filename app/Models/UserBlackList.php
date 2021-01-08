<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBlackList extends Model
{
    use HasFactory;

    public function company() {
        return $this->belongsTo('App\Models\Companies', 'company_id');
    }

    public function user() {
        return $this->belongsTo('App\Models\User');
    }
}
