<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Formulario;
use App\Models\Centro;
use App\Models\Empresa;
use App\Models\User;

class FormulariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Formulario::truncate();

        $users = User::all()->where('formulario_realizado', 1);
        $centros = Centro::all();
        $empresas = Empresa::all();

        foreach ($users as $user) {
            $formularioNuevo = new Formulario;
            $formularioNuevo->usuario_id = $user->id;
            $formularioNuevo->centro_id = $centros->random()->id;
            $formularioNuevo->empresa_id = $empresas->random()->id;
            $formularioNuevo->remoto = rand(0, 1);
            $formularioNuevo->opcion_quedarse = rand(0, 1);
            $formularioNuevo->salario_ofrecido = rand(1000, 3000);
            $formularioNuevo->val_empresa = rand(1, 10);
            $formularioNuevo->val_formacion = rand(1, 10);
            $formularioNuevo->val_ambiente_trabajo = rand(1, 10);
            $formularioNuevo->equipo_trabajo = rand(0, 1);

            $jornada = rand(0, 1);
            if ($jornada == 0) {
                $formularioNuevo->tipo_jornada = 'Continua';
                $formularioNuevo->hora_entrada = '06:00';
                $formularioNuevo->hora_salida = '14:00';
                $formularioNuevo->tiempo_descanso = 60;
            } else {
                $formularioNuevo->tipo_jornada = 'Partida';
                $formularioNuevo->hora_entrada = '08:00';
                $formularioNuevo->hora_salida = '19:00';
                $formularioNuevo->tiempo_descanso = 30;
            }

            $formularioNuevo->save();
        }
    }
}
