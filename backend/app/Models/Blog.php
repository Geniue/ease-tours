<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title_ar',
        'title_en',
        'slug_ar',
        'slug_en',
        'excerpt_ar',
        'excerpt_en',
        'body_ar',
        'body_en',
        'featured_image',
        'direction',
        'is_published',
        'is_featured',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
    ];

    protected $appends = ['featured_image_url'];

    public function getFeaturedImageUrlAttribute(): ?string
    {
        $image = $this->attributes['featured_image'] ?? null;
        if (!$image) return null;
        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://')) {
            return $image;
        }
        return preg_replace('#(?<!:)//+#', '/', Storage::disk('public')->url($image));
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
