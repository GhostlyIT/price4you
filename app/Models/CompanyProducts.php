<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyProducts extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'product_id',
        'product_type'
    ];

    public function product() {
        return $this->belongsTo('App\Models\Product', 'product_id', 'id_product');
    }

    public function fertiliser() {
        return $this->belongsTo('App\Models\Fertiliser', 'product_id', 'id_fertiliser');
    }

    public function seed() {
        return $this->belongsTo('App\Models\Seed', 'product_id', 'id_seed_product');
    }
}
