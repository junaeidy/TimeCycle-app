<?php

namespace App\Http\Controllers\Api;

use App\Models\Division;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class DivisionController extends Controller
{
    public function index()
    {
        return Division::all();
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'division_name' => 'required|string|max:255|unique:divisions,division_name',
                'description' => 'nullable|string',
            ]);

            $division = Division::create($validated);
            return response()->json($division, 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Gagal menambahkan divisi.',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    public function show($id)
    {
        return Division::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $division = Division::findOrFail($id);

        try {
            $validated = $request->validate([
                'division_name' => 'required|string|max:255|unique:divisions,division_name,' . $division->id,
                'description' => 'nullable|string',
            ]);

            $division->update($validated);
            return response()->json($division);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Gagal memperbarui divisi.',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    public function destroy($id)
    {
        $division = Division::findOrFail($id);
        $division->delete();
        return response()->json(['message' => 'Divisi berhasil dihapus']);
    }
}
