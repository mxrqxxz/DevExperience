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
        Schema::create('formularios', function (Blueprint $table) {
            $table->id();
            $table->boolean('remoto');
            $table->boolean('opcion_quedarse');
            $table->float('salario_ofrecido');
            $table->float('val_empresa');
            $table->float('val_formacion');
            $table->float('val_ambiente_trabajo');
            $table->string('tipo_jornada');
            $table->string('hora_entrada');
            $table->string('hora_salida');
            $table->string('tiempo_descanso');
            $table->boolean('equipo_trabajo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formularios');
    }
};
