<?php

namespace App\Models\Tara;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeedTara extends Model
{
    use HasFactory;

    protected $connection = 'mysql_ecoplant';
    protected $table = 'seed_tara';

    public function getTaraNameAttribute() {
        return "{$this->name_seed_tara_rus}";
    }

    protected $appends = ['tara_name'];
}
