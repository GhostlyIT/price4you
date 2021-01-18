<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Companies extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'company_address',
        'email',
        'director'
    ];

    public function user() {
        return $this->belongsTo('App\Models\User');
    }

    public function responses() {
        return $this->hasMany('App\Models\CompanyResponses', 'company_id');
    }

    public function getNameAttribute() {
        return "{$this->company_name}";
    }

    protected $appends = ['name'];
}
