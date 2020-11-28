<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $connection = 'mysql_ecoplant';
    protected $table = 'product';

    public function requestAndProduct() {
        return $this->hasMany('App\Models\UserRequestsAndProducts');
    }

    public function productClass() {
        return $this->belongsTo('App\Models\ProductClass', 'id_clproduct', 'id_clproduct');
    }
}
