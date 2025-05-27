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
        // For MySQL, altering ENUM requires raw query
        DB::statement("ALTER TABLE orders MODIFY COLUMN status ENUM('pending','shipped','Delivered','processing','cancelled') NOT NULL DEFAULT 'pending'");
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        // revert enum to previous state
        DB::statement("ALTER TABLE orders MODIFY COLUMN status ENUM('pending','completed','canceled') NOT NULL DEFAULT 'pending'");
    }
};
