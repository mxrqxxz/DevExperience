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
        Schema::create('tecnologias_formularios', function (Blueprint $table) {
            $table->unsignedBigInteger('tecnologia_id');
            $table->unsignedBigInteger('formulario_id');

            $table->primary(['tecnologia_id', 'formulario_id']);

            $table->foreign('tecnologia_id')->references('id')->on('tecnologias')->onDelete('cascade');
            $table->foreign('formulario_id')->references('id')->on('formularios')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tecnologias_formularios');
    }
};
