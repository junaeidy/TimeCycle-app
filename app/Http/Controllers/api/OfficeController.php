<?php

namespace App\Http\Controllers\Api;

use App\Models\Office;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OfficeController extends Controller
{
    public function index()
    {
        $offices = Office::all();

        return response()->json($offices);
    }
}
