<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('role_name')->unique();
            $table->timestamps();
        });

        // Insert default roles
        DB::table('roles')->insert([
            ['role_name' => 'admin'],
            ['role_name' => 'employee'],
            ['role_name' => 'supervisor'],
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('roles');
    }
};
