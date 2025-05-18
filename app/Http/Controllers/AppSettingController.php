<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use App\Http\Resources\AppSettingResource;
use App\Http\Requests\UpdateAppSettingRequest;
use Illuminate\Support\Facades\Storage;

class AppSettingController extends Controller
{

    public function show()
    {
        $setting = AppSetting::first();

        // Pastikan tidak null agar resource tidak error
        return inertia('AppSettingsPage', [
            'setting' => $setting ? new AppSettingResource($setting) : null,
        ]);
    }

    public function update(UpdateAppSettingRequest $request)
    {
        $setting = AppSetting::firstOrCreate([]);
        $data = $request->validated();

        // Tangani hapus logo dulu
        if ($request->boolean('remove_logo')) {
            if ($setting->app_logo) {
                Storage::disk('public')->delete($setting->app_logo);
            }
            $data['app_logo'] = null;
        }

        // Tangani upload logo baru
        if ($request->hasFile('app_logo')) {
            if ($setting->app_logo) {
                Storage::disk('public')->delete($setting->app_logo);
            }
            $data['app_logo'] = $request->file('app_logo')->store('logos', 'public');
        }

        $setting->update([
            'app_name' => $data['app_name'],
            'app_logo' => $data['app_logo'] ?? $setting->app_logo,
        ]);

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
    }
}