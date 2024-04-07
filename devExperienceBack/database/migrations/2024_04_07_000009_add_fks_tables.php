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
            $table->unsignedBigInteger('formulario_id')->nullable();
            $table->foreign('formulario_id')->references('id')->on('formularios');
        });

        Schema::table('comentarios', function (Blueprint $table) {
            $table->unsignedBigInteger('usuario_id');
            $table->foreign('usuario_id')->references('id')->on('users');

            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')->references('id')->on('empresas');
        });

        Schema::table('formularios', function (Blueprint $table) {
            $table->unsignedBigInteger('centro_id');
            $table->foreign('centro_id')->references('id')->on('centros');

            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')->references('id')->on('empresas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_formulario_id_foreign');
            $table->dropColumn('formulario_id');
        });
        Schema::table('comentarios', function (Blueprint $table) {
            $table->dropForeign('comentarios_usuario_id_foreign');
            $table->dropColumn('usuario_id');

            $table->dropForeign('comentarios_empresa_id_foreign');
            $table->dropColumn('empresa_id');
        });
        Schema::table('formularios', function (Blueprint $table) {
            $table->dropForeign('formularios_centro_id_foreign');
            $table->dropColumn('centro_id');

            $table->dropForeign('formularios_empresa_id_foreign');
            $table->dropColumn('empresa_id');
        });
    }
};
