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

    public function update(Request $request, $id)
    {
        $office = Office::findOrFail($id);

        $validated = $request->validate([
            'location_name' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'radius_meter' => 'required|integer|min:1',
        ]);

        $office->update($validated);

        return response()->json($office);
    }
}
