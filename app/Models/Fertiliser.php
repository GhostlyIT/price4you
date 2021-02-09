<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fertiliser extends Model
{
    use HasFactory;

    protected $connection = 'mysql_ecoplant';
    protected $table = 'fertiliser';

    public function tara() {
        return $this->hasOneThrough('App\Models\Tara\ProductTara', 'App\Models\Tara\FertiliserAndTara', 'id_fertiliser', 'id_product_tara', 'id', 'id_fertiliser_tara');
    }

    public function taraMiddleware() {
        return $this->hasOne('App\Models\Tara\FertiliserAndTara', 'id_fertiliser', 'id_fertiliser');
    }

    public function getNameAttribute() {
        return "{$this->name_fertiliser}";
    }

    public function getIdAttribute() {
        return $this->id_fertiliser;
    }

    protected $appends = ['name', 'id'];
}
