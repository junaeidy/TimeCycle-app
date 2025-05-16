<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('check_in')->nullable();
            $table->timestamp('check_out')->nullable();
            $table->foreignId('office_location_id')->nullable()->constrained('office_locations')->onDelete('set null');
            $table->enum('status', ['present', 'absent', 'late', 'leave'])->default('present');
            $table->string('device_info')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
