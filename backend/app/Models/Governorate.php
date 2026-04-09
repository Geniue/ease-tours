<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Governorate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_ar',
        'name_en',
        'slug_ar',
        'slug_en',
        'capital_ar',
        'capital_en',
        'latitude',
        'longitude',
        'map_zoom',
        'meta_title_ar',
        'meta_title_en',
        'meta_description_ar',
        'meta_description_en',
        'excerpt_ar',
        'excerpt_en',
        'body_ar',
        'body_en',
        'faqs',
        'featured_image',
        'cover_image',
        'population',
        'area_km2',
        'region_ar',
        'region_en',
        'is_published',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'faqs' => 'array',
        'is_published' => 'boolean',
        'is_featured' => 'boolean',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    protected $appends = ['featured_image_url', 'cover_image_url'];

    public function getFeaturedImageUrlAttribute(): ?string
    {
        $image = $this->attributes['featured_image'] ?? null;
        if (!$image) return null;
        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://')) {
            return $image;
        }
        return preg_replace('#(?<!:)//+#', '/', Storage::disk('public')->url($image));
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        $image = $this->attributes['cover_image'] ?? null;
        if (!$image) return null;
        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://')) {
            return $image;
        }
        return preg_replace('#(?<!:)//+#', '/', Storage::disk('public')->url($image));
    }
}
