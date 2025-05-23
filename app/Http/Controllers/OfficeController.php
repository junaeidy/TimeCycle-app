<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Office;
use Illuminate\Http\Request;

class OfficeController extends Controller
{
    public function index()
    {
        return Inertia::render('Offices/OfficePage');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'location_name' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'radius_meter' => 'required|integer|min:1',
        ]);

        $office = Office::create($validated);

        return response()->json($office, 201);
    }
}
