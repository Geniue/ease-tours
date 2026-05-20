<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class VisaGalleryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_ar',
        'title_en',
        'slug_ar',
        'slug_en',
        'country_ar',
        'country_en',
        'visa_type_ar',
        'visa_type_en',
        'region',
        'city_ar',
        'city_en',
        'governorate_id',
        'processed_month',
        'processed_year',
        'processing_days',
        'image_path',
        'alt_ar',
        'alt_en',
        'summary_ar',
        'summary_en',
        'is_redacted',
        'has_client_consent',
        'is_featured',
        'is_published',
        'sort_order',
        'published_at',
    ];

    protected $casts = [
        'is_redacted' => 'boolean',
        'has_client_consent' => 'boolean',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'processed_month' => 'integer',
        'processed_year' => 'integer',
        'processing_days' => 'integer',
        'published_at' => 'datetime',
    ];

    protected $appends = ['image_url'];

    protected static function booted(): void
    {
        static::saving(function (self $item) {
            $item->fillGeneratedTitles();
            $item->fillGeneratedSlugs();
            $item->validatePublishingCompliance();

            if ($item->is_published && !$item->published_at) {
                $item->published_at = now();
            }
        });
    }

    public function governorate(): BelongsTo
    {
        return $this->belongsTo(Governorate::class);
    }

    public function scopePublicSafe(Builder $query): Builder
    {
        return $query
            ->where('is_published', true)
            ->where('is_redacted', true)
            ->where('has_client_consent', true)
            ->whereNotNull('image_path');
    }

    public function getImageUrlAttribute(): ?string
    {
        $image = $this->attributes['image_path'] ?? null;
        if (!$image) {
            return null;
        }

        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://')) {
            return $image;
        }

        return preg_replace('#(?<!:)//+#', '/', Storage::disk('public')->url($image));
    }

    private function fillGeneratedTitles(): void
    {
        if (!$this->title_ar) {
            $this->title_ar = "تأشيرة {$this->country_ar} لعميل من {$this->city_ar}";
        }

        if (!$this->title_en) {
            $country = $this->country_en ?: $this->country_ar;
            $city = $this->city_en ?: $this->city_ar;
            $this->title_en = "{$country} visa for a client from {$city}";
        }
    }

    private function fillGeneratedSlugs(): void
    {
        if (!$this->slug_ar) {
            $this->slug_ar = $this->uniqueSlug(
                $this->arabicSlug($this->slugSource('ar')),
                'slug_ar'
            );
        }

        if (!$this->slug_en) {
            $this->slug_en = $this->uniqueSlug(
                Str::slug($this->slugSource('en')) ?: Str::slug($this->slugSource('ar')) ?: 'visa-case',
                'slug_en'
            );
        }
    }

    private function slugSource(string $locale): string
    {
        $title = $locale === 'ar' ? $this->title_ar : $this->title_en;
        $country = $locale === 'ar' ? $this->country_ar : ($this->country_en ?: $this->country_ar);
        $city = $locale === 'ar' ? $this->city_ar : ($this->city_en ?: $this->city_ar);

        return trim(implode(' ', array_filter([
            $title,
            $country,
            $city,
            $this->processed_year,
        ])));
    }

    private function arabicSlug(string $value): string
    {
        $clean = preg_replace('/[^\p{Arabic}\p{L}\p{N}\s-]+/u', '', $value) ?: '';
        $clean = preg_replace('/[\s-]+/u', '-', trim($clean, " \t\n\r\0\x0B-")) ?: '';

        return $clean ?: 'تأشيرة';
    }

    private function uniqueSlug(string $base, string $column): string
    {
        $base = $base ?: 'visa-case';
        $slug = $base;
        $counter = 2;

        while (
            static::query()
                ->where($column, $slug)
                ->when($this->exists, fn ($query) => $query->whereKeyNot($this->getKey()))
                ->exists()
        ) {
            $slug = "{$base}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    private function validatePublishingCompliance(): void
    {
        if (!$this->is_published) {
            return;
        }

        $errors = [];

        if (!$this->is_redacted) {
            $errors['is_redacted'] = 'Published visa gallery items must be redacted.';
        }

        if (!$this->has_client_consent) {
            $errors['has_client_consent'] = 'Published visa gallery items must have client consent.';
        }

        if (!$this->image_path) {
            $errors['image_path'] = 'Published visa gallery items must have a public-safe redacted image.';
        }

        if ($errors) {
            throw ValidationException::withMessages($errors);
        }
    }
}
