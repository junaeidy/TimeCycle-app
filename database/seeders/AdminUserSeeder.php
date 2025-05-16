<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'created_by' => null,
            'nik' => '1000000001',
            'phone' => '081234567890',
            'place_of_birth' => 'Jakarta',
            'date_of_birth' => '1990-01-01',
            'address' => 'Jl. Sudirman No. 1, Jakarta',
            'gender' => 'male',
            'marital_status' => 'single',
            'position' => 'HR Manager',
            'is_active' => true,
        ]);
    }
}
