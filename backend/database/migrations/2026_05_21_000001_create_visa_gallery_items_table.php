<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('visa_gallery_items', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar')->nullable();
            $table->string('title_en')->nullable();
            $table->string('slug_ar')->nullable()->unique();
            $table->string('slug_en')->nullable()->unique();
            $table->string('country_ar')->index();
            $table->string('country_en')->nullable();
            $table->string('visa_type_ar');
            $table->string('visa_type_en')->nullable();
            $table->enum('region', [
                'schengen',
                'gulf',
                'asia',
                'africa',
                'america',
                'europe',
                'other',
            ])->nullable()->index();
            $table->string('city_ar')->index();
            $table->string('city_en')->nullable();
            $table->foreignId('governorate_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete()
                ->index();
            $table->unsignedTinyInteger('processed_month')->nullable();
            $table->unsignedSmallInteger('processed_year')->nullable()->index();
            $table->unsignedInteger('processing_days')->nullable();
            $table->string('image_path');
            $table->string('alt_ar')->nullable();
            $table->string('alt_en')->nullable();
            $table->text('summary_ar')->nullable();
            $table->text('summary_en')->nullable();
            $table->boolean('is_redacted')->default(false);
            $table->boolean('has_client_consent')->default(false);
            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_published')->default(false)->index();
            $table->integer('sort_order')->default(0);
            $table->timestamp('published_at')->nullable()->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('visa_gallery_items');
    }
};
