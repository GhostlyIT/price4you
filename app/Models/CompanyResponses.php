<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyResponses extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'request_id',
        'price',
        'comment'
    ];

    public function company() {
        return $this->belongsTo('App\Models\Companies', 'company_id');
    }

    public function product() {
        return $this->belongsTo('App\Models\UserRequestsAndProducts', 'request_id', 'id');
    }
}
