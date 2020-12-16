<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegData extends Model
{
    use HasFactory;

    protected $connection = 'mysql_ecoplant';
    protected $table = 'regdata';

    public function culture() {
        return $this->belongsTo('App\Models\Culture', 'id_culture', 'id_culture');
    }
}
