<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('student_id');
            $table->string('code');
            $table->string('description');
            $table->integer('lec_unit');
            $table->integer('lab_unit');
            $table->integer('credit_unit');
            $table->string('section');
            $table->json('schedule'); // Storing schedule as JSON array
            $table->string('teacher');
            $table->string('email');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
