<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('client_transactions', function (Blueprint $table) {
            $table->timestamp('completed_at')->nullable()->after('follow_up_date');
        });

        // Backfill: done transactions without a completed_at → use transaction_date
        DB::statement("
            UPDATE client_transactions
            SET completed_at = transaction_date
            WHERE status = 'done' AND completed_at IS NULL AND transaction_date IS NOT NULL
        ");
    }

    public function down(): void
    {
        Schema::table('client_transactions', function (Blueprint $table) {
            $table->dropColumn('completed_at');
        });
    }
};
