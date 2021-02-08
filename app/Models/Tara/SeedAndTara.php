<?php

namespace App\Models\Tara;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeedAndTara extends Model
{
    use HasFactory;

    protected $connection = 'mysql_ecoplant';
    protected $table = 'seed_and_seed_tara';

    public function tara() {
        return $this->hasOne('App\Models\Tara\SeedTara', 'id_seed_tara', 'id_seed_tara');
    }
}
