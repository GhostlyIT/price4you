<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyRegions extends Model
{
    use HasFactory;

    protected $fillable = [
      'company_id',
      'region_id'
    ];

    public function region() {
        return $this->belongsTo('App\Models\Region', 'region_id', 'id_count_reg');
    }
}
