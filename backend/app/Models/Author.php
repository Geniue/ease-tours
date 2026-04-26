<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_ar',
        'name_en',
        'slug_ar',
        'slug_en',
        'expertise_ar',
        'expertise_en',
        'bio_ar',
        'bio_en',
        'photo',
        'email',
        'social_twitter',
        'social_linkedin',
        'social_facebook',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = ['photo_url'];

    public function getPhotoUrlAttribute(): ?string
    {
        $photo = $this->attributes['photo'] ?? null;
        if (!$photo) return null;
        if (str_starts_with($photo, 'http://') || str_starts_with($photo, 'https://')) {
            return $photo;
        }
        return preg_replace('#(?<!:)//+#', '/', Storage::disk('public')->url($photo));
    }

    public function blogs(): HasMany
    {
        return $this->hasMany(Blog::class);
    }
}
