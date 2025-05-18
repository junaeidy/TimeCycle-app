<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Inertia::share([
            'app_logo_url' => function () {
                $setting = \App\Models\AppSetting::first();
                return $setting && $setting->app_logo
                    ? asset('storage/' . $setting->app_logo)
                    : asset('/image/Logo.png');
            },
            'app_favicon_url' => function () {
                $setting = \App\Models\AppSetting::first();
                return $setting && $setting->favicon
                    ? asset('storage/' . $setting->favicon)
                    : asset('/favicon.ico');
            },
            'app_name' => function () {
                return \App\Models\AppSetting::first()->app_name ?? 'TimeCycle';
            },
        ]);
    }
}
