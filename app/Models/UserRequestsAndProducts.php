<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRequestsAndProducts extends Model
{
    use HasFactory;

    protected $fillable = [
      'user_requests_id', 'product_type', 'product_id', 'value', 'unit'
    ];

    public function request() {
        return $this->belongsTo('App\Models\UserRequests');
    }

    public function product() {
        return $this->belongsTo('App\Models\Product');
    }
}
