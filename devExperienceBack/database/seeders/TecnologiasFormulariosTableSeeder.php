<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TecnologiasFormularios;
use App\Models\Formulario;
use App\Models\Tecnologia;

class TecnologiasFormulariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        TecnologiasFormularios::truncate();

        $formularios = Formulario::all();
        $tecnologiasFront = Tecnologia::all()->where('tipo', 'Front-end');
        $tecnologiasBack = Tecnologia::all()->where('tipo', 'Back-end');
        $tecnologiasCV = Tecnologia::all()->where('tipo', 'Control de versiones');
        $tecnologiasBBDD = Tecnologia::all()->where('tipo', 'Base de datos');

        foreach ($formularios as $formulario) {

            // Como cada formulario tendrá 4 tecnologías asociadas, se hará un bucle de 4 iteraciones,
            // en cada una de las cuales se asignará una tecnología de cada tipo

            for ($i = 0; $i < 4; $i++) {

                switch ($i) {
                    case 0:
                        $tecnologias = $tecnologiasFront;
                        break;
                    case 1:
                        $tecnologias = $tecnologiasBack;
                        break;
                    case 2:
                        $tecnologias = $tecnologiasCV;
                        break;
                    case 3:
                        $tecnologias = $tecnologiasBBDD;
                        break;
                }

                $registro = new TecnologiasFormularios();
                $registro->formulario_id = $formulario->id;
                $registro->tecnologia_id = $tecnologias->random()->id;
                $registro->save();
            }
        }
    }
}
