<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('embassies', function (Blueprint $table) {
            $table->id();
            $table->string('country_name_ar');
            $table->string('country_name_en');
            $table->string('slug')->unique();
            $table->string('flag_emoji')->nullable();
            $table->enum('appointment_status', ['open', 'closed', 'stopped'])->default('closed');
            $table->date('next_open_date')->nullable();
            $table->date('next_close_date')->nullable();
            $table->decimal('appointment_price', 10, 2)->nullable();
            $table->string('price_currency')->default('EGP');
            $table->text('notes_ar')->nullable();
            $table->text('notes_en')->nullable();
            $table->text('stopped_visas_ar')->nullable();
            $table->text('stopped_visas_en')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('embassies');
    }
};
