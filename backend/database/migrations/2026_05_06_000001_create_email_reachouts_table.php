<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('email_reachouts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->json('recipient_sources');
            $table->text('manual_recipients')->nullable();
            $table->json('recipient_emails');
            $table->unsignedInteger('recipient_count')->default(0);
            $table->unsignedInteger('sent_count')->default(0);
            $table->json('failed_recipients')->nullable();
            $table->string('status')->default('pending');
            $table->string('subject');
            $table->longText('body');
            $table->string('reply_to')->nullable();
            $table->json('attachments')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('email_reachouts');
    }
};
