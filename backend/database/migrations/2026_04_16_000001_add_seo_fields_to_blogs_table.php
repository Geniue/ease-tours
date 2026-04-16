<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->string('seo_title_ar')->nullable()->after('excerpt_en');
            $table->string('seo_title_en')->nullable()->after('seo_title_ar');
            $table->text('seo_description_ar')->nullable()->after('seo_title_en');
            $table->text('seo_description_en')->nullable()->after('seo_description_ar');
            $table->string('keywords_ar')->nullable()->after('seo_description_en');
            $table->string('keywords_en')->nullable()->after('keywords_ar');
        });
    }

    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn([
                'seo_title_ar', 'seo_title_en',
                'seo_description_ar', 'seo_description_en',
                'keywords_ar', 'keywords_en',
            ]);
        });
    }
};
