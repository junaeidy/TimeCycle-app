<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    protected $fillable = ['location_name', 'latitude', 'longitude', 'radius_meter'];
}
