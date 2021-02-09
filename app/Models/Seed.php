<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seed extends Model
{
    use HasFactory;

    protected $connection = 'mysql_ecoplant';
    protected $table = 'seed_product';

    public function tara() {
        return $this->hasOneThrough('App\Models\Tara\SeedTara', 'App\Models\Tara\SeedAndTara', 'id_seed_product', 'id_seed_tara', 'id', 'id_seed_tara');
    }

    public function taraMiddleware() {
        return $this->hasOne('App\Models\Tara\SeedAndTara', 'id_seed_product', 'id_seed_product');
    }

    public function getNameAttribute() {
        return "{$this->name_seed_rus}";
    }

    public function getIdAttribute() {
        return $this->id_seed_product;
    }

    protected $appends = ['name', 'id'];
}
