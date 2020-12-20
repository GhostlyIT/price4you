<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seed extends Model
{
    use HasFactory;

    protected $connection = 'mysql_ecoplant';
    protected $table = 'seed_product';

    public function getNameAttribute() {
        return "{$this->name_seed_rus}";
    }

    protected $appends = ['name'];
}
