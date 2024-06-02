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
        Schema::create('students_info', function (Blueprint $table) {
            $table->id();
            $table->string('profile_image')->nullable();
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('middle_initial', 1)->nullable();
            $table->string('ext')->nullable();
            $table->string('gender');
            $table->date('date_of_birth');
            $table->string('place_of_birth');
            $table->string('civil_status');
            $table->string('nationality');
            $table->string('religion')->nullable();
            $table->string('email')->nullable();
            $table->string('contact_number')->nullable();
            $table->float('height')->nullable();
            $table->float('weight')->nullable();
            $table->string('blood_type')->nullable();
            $table->string('ethnicity')->nullable();
            $table->string('address')->nullable();
            $table->string('province')->nullable();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('emergency_contact_person')->nullable();
            $table->string('emergency_address')->nullable();
            $table->string('emergency_mobile_number')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students_info');
    }
};
