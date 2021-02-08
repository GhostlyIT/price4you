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

    public function culture() {
        return $this->belongsToMany('App\Models\Culture', 'product_and_culture', 'id_product', 'id_culture', '', 'id_culture');
    }

    public function regdata() {
        return $this->belongsToMany('App\Models\RegData', 'product_and_regdata', 'id_product', 'id_regdata', '', 'id_regdata');
    }

    public function regdataForLph() {
        return $this->hasMany('App\Models\RegDataForLph', 'id_product');
    }

    public function regdataForAvia() {
        return $this->hasMany('App\Models\RegDataForAvia', 'id_product');
    }

    public function tara() {
        return $this->hasOneThrough('App\Models\Tara\ProductTara', 'App\Models\Tara\ProductAndTara', 'id_product', 'id_product_tara', 'id', 'id_product_tara');
    }

    public function taraMiddleware() {
        return $this->hasOne('App\Models\Tara\ProductAndTara', 'id_product', 'id_product');
    }




    public function getNameAttribute() {
        return "{$this->name_product_rus}";
    }



    protected $appends = ['name'];
}
