<?php

namespace App\Providers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        // Ensure upload directories exist on every boot (safe on all environments)
        foreach (['blogs', 'blogs/body-images', 'trips', 'services', 'livewire-tmp'] as $dir) {
            Storage::disk('public')->makeDirectory($dir);
        }
    }
}
