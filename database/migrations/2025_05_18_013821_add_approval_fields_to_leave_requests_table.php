<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leave_requests', function (Blueprint $table) {
            DB::statement("ALTER TABLE leave_requests MODIFY status ENUM(
                'waiting_supervisor_approval',
                'rejected_by_supervisor',
                'waiting_hr_approval',
                'rejected_by_hr',
                'approved'
            ) DEFAULT 'waiting_supervisor_approval'");

            $table->foreignId('supervisor_approved_by')->nullable()->after('status')->constrained('users')->onDelete('set null');
            $table->timestamp('supervisor_approved_at')->nullable()->after('supervisor_approved_by');

            $table->foreignId('hr_approved_by')->nullable()->after('supervisor_approved_at')->constrained('users')->onDelete('set null');
            $table->timestamp('hr_approved_at')->nullable()->after('hr_approved_by');
        });
    }

    public function down(): void
    {
        Schema::table('leave_requests', function (Blueprint $table) {
            $table->dropForeign(['supervisor_approved_by']);
            $table->dropColumn(['supervisor_approved_by', 'supervisor_approved_at']);

            $table->dropForeign(['hr_approved_by']);
            $table->dropColumn(['hr_approved_by', 'hr_approved_at']);

            DB::statement("ALTER TABLE leave_requests MODIFY status ENUM(
                'pending', 'approved', 'rejected'
            ) DEFAULT 'pending'");
        });
    }
};
