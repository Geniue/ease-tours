<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('governorates', function (Blueprint $table) {
            $table->id();
            // Basic Info
            $table->string('name_ar');
            $table->string('name_en');
            $table->string('slug_ar')->unique();
            $table->string('slug_en')->unique();
            $table->string('capital_ar');
            $table->string('capital_en');
            // Map coordinates (capital city center)
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->unsignedTinyInteger('map_zoom')->default(12);
            // SEO meta
            $table->string('meta_title_ar')->nullable();
            $table->string('meta_title_en')->nullable();
            $table->text('meta_description_ar')->nullable();
            $table->text('meta_description_en')->nullable();
            // Excerpts (shown on listing page)
            $table->text('excerpt_ar')->nullable();
            $table->text('excerpt_en')->nullable();
            // Rich body content (SEO-optimized HTML)
            $table->longText('body_ar');
            $table->longText('body_en');
            // FAQs stored as JSON: [{ question_ar, question_en, answer_ar, answer_en }]
            $table->json('faqs')->nullable();
            // Media
            $table->string('featured_image')->nullable();
            $table->string('cover_image')->nullable();
            // Stats / quick facts
            $table->string('population')->nullable();
            $table->string('area_km2')->nullable();
            $table->string('region_ar')->nullable();
            $table->string('region_en')->nullable();
            // Publishing
            $table->boolean('is_published')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('governorates');
    }
};
