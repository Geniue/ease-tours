<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_embassy', function (Blueprint $table) {
            $table->foreignId('blog_id')->constrained()->cascadeOnDelete();
            $table->foreignId('embassy_id')->constrained()->cascadeOnDelete();
            $table->primary(['blog_id', 'embassy_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_embassy');
    }
};
