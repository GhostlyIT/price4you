<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegDataForLph extends Model
{
    use HasFactory;

    protected $connection = 'mysql_ecoplant';
    protected $table = 'regdata_for_lph';

    public function culture() {
        return $this->belongsTo('App\Models\Culture', 'id_culture', 'id_culture');
    }

    public function product() {
        return $this->hasOne('App\Models\Product', 'id_product', 'id_product');
    }
}
