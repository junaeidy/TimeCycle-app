<?php

namespace App\Http\Controllers\Api;

use Log;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = User::with('role')
            ->whereHas('role', function ($query) {
                $query->where('role_name', '!=', 'admin');
            })
            ->get();

        return response()->json($employees);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'required|string|max:100|unique:users,nik',
            'place_of_birth' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'position' => 'nullable|string|max:100',
            'role_id' => 'required|exists:roles,id',
            'password' => 'required|string|min:6|confirmed',
            'photo' => 'nullable|image|max:2048',
        ]);

        $user = new User([
            'name' => $request->name,
            'nik' => $request->nik,
            'place_of_birth' => $request->place_of_birth,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'position' => $request->position,
            'role_id' => $request->role_id,
            'password' => Hash::make($request->password),
            'is_active' => true,
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('profile_photos', 'public');
            $user->profile_photo_path = $path;
        }

        $user->save();

        return response()->json(['message' => 'Karyawan berhasil ditambahkan'], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'position' => 'nullable|string|max:100',
            'role_id' => 'required|exists:roles,id',
        ]);

        if ($request->hasFile('profile_photo')) {
            if ($user->profile_photo_path) {
                Storage::delete('public/' . $user->profile_photo_path);
            }
            $path = $request->file('profile_photo')->store('profile-photos', 'public');
            $user->profile_photo_path = $path;
        }

        if ($request->boolean('remove_photo')) {
            if ($user->profile_photo_path) {
                Storage::delete('public/' . $user->profile_photo_path);
                $user->profile_photo_path = null;
            }
        }

        $user->update($validated);

        return response()->json([
            'message' => 'Data karyawan berhasil diperbarui.',
            'data' => $user->load('role'),
        ]);
    }
}
