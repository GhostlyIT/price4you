<?php

namespace App\Models\Tara;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FertiliserAndTara extends Model
{
    use HasFactory;

    protected $connection = 'mysql_ecoplant';
    protected $table = 'fertiliser_and_tara';

    public function tara() {
        return $this->hasOne('App\Models\Tara\ProductTara', 'id_product_tara', 'id_fertiliser_tara');
    }
}
