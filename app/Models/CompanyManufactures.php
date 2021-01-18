<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyManufactures extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'manufacture_id'
    ];

    public function manufacture() {
        return $this->hasOne('App\Models\Manufacture', 'id_manufacture', 'manufacture_id');
    }
}
