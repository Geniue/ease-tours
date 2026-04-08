<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class IndexNowService
{
    protected string $key;
    protected string $host;
    protected string $endpoint = 'https://api.indexnow.org/indexnow';

    public function __construct()
    {
        $this->key = config('services.indexnow.key', '');
        $this->host = config('services.indexnow.host', 'ease-travel.online');
    }

    /**
     * Submit a single URL to IndexNow.
     */
    public function submitUrl(string $url): bool
    {
        return $this->submitUrls([$url]);
    }

    /**
     * Submit multiple URLs to IndexNow (up to 10,000).
     */
    public function submitUrls(array $urls): bool
    {
        if (empty($this->key) || empty($urls)) {
            return false;
        }

        try {
            $response = Http::timeout(10)->post($this->endpoint, [
                'host' => $this->host,
                'key' => $this->key,
                'urlList' => array_values($urls),
            ]);

            $status = $response->status();

            if (in_array($status, [200, 202])) {
                Log::info('IndexNow: Successfully submitted ' . count($urls) . ' URL(s)', [
                    'status' => $status,
                    'urls' => $urls,
                ]);
                return true;
            }

            Log::warning('IndexNow: Submission returned status ' . $status, [
                'urls' => $urls,
                'response' => $response->body(),
            ]);
            return false;

        } catch (\Exception $e) {
            Log::error('IndexNow: Submission failed', [
                'error' => $e->getMessage(),
                'urls' => $urls,
            ]);
            return false;
        }
    }

    /**
     * Submit both AR and EN blog URLs.
     */
    public function submitBlog(\App\Models\Blog $blog): bool
    {
        $urls = [
            "https://{$this->host}/ar/blog/{$blog->slug_ar}",
            "https://{$this->host}/en/blog/{$blog->slug_en}",
        ];

        return $this->submitUrls($urls);
    }

    /**
     * Submit both AR and EN trip URLs.
     */
    public function submitTrip(\App\Models\Trip $trip): bool
    {
        $urls = [
            "https://{$this->host}/ar/tours/{$trip->slug_ar}",
            "https://{$this->host}/en/tours/{$trip->slug_en}",
        ];

        return $this->submitUrls($urls);
    }

    /**
     * Submit embassy listing pages (no individual detail pages).
     */
    public function submitEmbassyPages(): bool
    {
        return $this->submitUrls([
            "https://{$this->host}/ar/embassy",
            "https://{$this->host}/en/embassy",
        ]);
    }

    /**
     * Submit all published blogs and active trips (initial batch).
     */
    public function submitAll(): array
    {
        $urls = [];

        // All published blogs
        $blogs = \App\Models\Blog::where('is_published', true)->get();
        foreach ($blogs as $blog) {
            $urls[] = "https://{$this->host}/ar/blog/{$blog->slug_ar}";
            $urls[] = "https://{$this->host}/en/blog/{$blog->slug_en}";
        }

        // All active trips
        $trips = \App\Models\Trip::where('is_active', true)->get();
        foreach ($trips as $trip) {
            $urls[] = "https://{$this->host}/ar/tours/{$trip->slug_ar}";
            $urls[] = "https://{$this->host}/en/tours/{$trip->slug_en}";
        }

        // Static pages
        $staticPages = [
            "https://{$this->host}/ar",
            "https://{$this->host}/en",
            "https://{$this->host}/ar/tours",
            "https://{$this->host}/en/tours",
            "https://{$this->host}/ar/blog",
            "https://{$this->host}/en/blog",
            "https://{$this->host}/ar/about",
            "https://{$this->host}/en/about",
            "https://{$this->host}/ar/contact",
            "https://{$this->host}/en/contact",
            "https://{$this->host}/ar/services",
            "https://{$this->host}/en/services",
            "https://{$this->host}/ar/embassy",
            "https://{$this->host}/en/embassy",
        ];

        $urls = array_merge($urls, $staticPages);

        $success = $this->submitUrls($urls);

        return [
            'success' => $success,
            'total_urls' => count($urls),
            'blogs' => $blogs->count(),
            'trips' => $trips->count(),
        ];
    }
}
