<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fertiliser extends Model
{
    use HasFactory;

    protected $connection = 'mysql_ecoplant';
    protected $table = 'fertiliser';

    public function getNameAttribute() {
        return "{$this->name_fertiliser}";
    }

    protected $appends = ['name'];
}
