<?php

namespace App\Models\Tara;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTara extends Model
{
    use HasFactory;

    protected $connection = 'mysql_ecoplant';
    protected $table = 'product_tara';

    public function getTaraNameAttribute() {
        return "{$this->pack_and_tara}";
    }

    protected $appends = ['tara_name'];
}
