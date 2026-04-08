<?php

namespace App\Console\Commands;

use App\Services\IndexNowService;
use Illuminate\Console\Command;

class IndexNowSubmitAll extends Command
{
    protected $signature = 'indexnow:submit-all';
    protected $description = 'Submit all published blogs and active trips to IndexNow';

    public function handle(): int
    {
        $this->info('Submitting all URLs to IndexNow...');

        $service = app(IndexNowService::class);
        $result = $service->submitAll();

        if ($result['success']) {
            $this->info("Successfully submitted {$result['total_urls']} URLs:");
            $this->info("  - Blogs: {$result['blogs']} (x2 languages = " . ($result['blogs'] * 2) . " URLs)");
            $this->info("  - Trips: {$result['trips']} (x2 languages = " . ($result['trips'] * 2) . " URLs)");
            $this->info("  - Static pages: 12 URLs");
            return Command::SUCCESS;
        }

        $this->error('Failed to submit URLs. Check logs for details.');
        return Command::FAILURE;
    }
}
