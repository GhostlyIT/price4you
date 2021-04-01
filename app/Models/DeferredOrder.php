<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeferredOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip',
        'products'
    ];

    protected $casts = [
        'products' => 'array'
    ];
}
