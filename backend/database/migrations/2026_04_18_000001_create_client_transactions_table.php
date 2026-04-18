<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client_transactions', function (Blueprint $table) {
            $table->id();
            $table->date('transaction_date')->nullable();
            $table->string('client_name');
            $table->string('service')->nullable();
            $table->enum('status', ['done', 'waiting', 'lost'])->default('waiting');
            $table->date('follow_up_date')->nullable();
            $table->decimal('net_price', 12, 2)->default(0);
            $table->decimal('sell_price', 12, 2)->default(0);
            $table->decimal('profit', 12, 2)->default(0);
            $table->decimal('current_money', 12, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('client_transactions');
    }
};
