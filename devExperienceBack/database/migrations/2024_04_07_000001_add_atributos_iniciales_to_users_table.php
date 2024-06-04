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
        Schema::table('users', function (Blueprint $table) {
            $table->string('nombre', 32);
            $table->string('apellidos', 40);
            $table->string('sobre_mi')->nullable();
            $table->string('avatar', 500)->nullable();
            $table->boolean('formulario_realizado')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('nombre');
            $table->dropColumn('apellidos');
            $table->dropColumn('sobre_mi');
            $table->dropColumn('avatar');
            $table->dropColumn('fecha_alta');
            $table->dropColumn('practicas_realizadas');
        });
    }
};
