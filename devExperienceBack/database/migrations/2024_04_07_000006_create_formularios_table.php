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
            $table->float('tipo_jornada');
            $table->float('hora_entrada');
            $table->float('hora_salida');
            $table->float('tiempo_descanso');
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
