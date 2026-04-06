<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Trip extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title_ar',
        'title_en',
        'slug_ar',
        'slug_en',
        'description_ar',
        'description_en',
        'itinerary_ar',
        'itinerary_en',
        'inclusions_ar',
        'inclusions_en',
        'destination_ar',
        'destination_en',
        'duration_days',
        'base_price',
        'discounted_price',
        'currency',
        'featured_image',
        'video',
        'video_thumbnail',
        'is_featured',
        'is_active',
        'coming_soon',
        'start_date',
        'end_date',
        'max_participants',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'discounted_price' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'coming_soon' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    protected $appends = ['featured_image_url', 'video_url', 'video_thumbnail_url'];

    public function getFeaturedImageUrlAttribute(): ?string
    {
        $image = $this->attributes['featured_image'] ?? null;
        if (!$image) return null;
        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://')) {
            return $image;
        }
        return preg_replace('#(?<!:)//+#', '/', Storage::disk('public')->url($image));
    }

    public function getVideoUrlAttribute(): ?string
    {
        $video = $this->attributes['video'] ?? null;
        if (!$video) return null;
        if (str_starts_with($video, 'http://') || str_starts_with($video, 'https://')) {
            return $video;
        }
        return preg_replace('#(?<!:)//+#', '/', Storage::disk('public')->url($video));
    }

    public function getVideoThumbnailUrlAttribute(): ?string
    {
        $thumb = $this->attributes['video_thumbnail'] ?? null;
        if (!$thumb) return null;
        if (str_starts_with($thumb, 'http://') || str_starts_with($thumb, 'https://')) {
            return $thumb;
        }
        return preg_replace('#(?<!:)//+#', '/', Storage::disk('public')->url($thumb));
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(TripImage::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
