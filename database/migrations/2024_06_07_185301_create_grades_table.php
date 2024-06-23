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
        Schema::create('grades', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->integer('student_id');
            $table->string('code'); // Course code
            $table->string('descriptive'); // Descriptive title
            $table->integer('units'); // Units of the course
            $table->string('section'); // Section of the course
            $table->decimal('midterm', 4, 2)->nullable(); // Midterm grade
            $table->decimal('final', 4, 2)->nullable(); // Final grade
            $table->decimal('reExam', 4, 2)->nullable(); // Re-exam grade, nullable
            $table->string('remarks')->default('Not Yet Posted'); // Remarks
            $table->timestamps(); // Laravel's created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
