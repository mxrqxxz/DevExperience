<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Insignia;

class InsigniasTableSeeder extends Seeder
{
    private static $arrayInsignias = [
        [
            'nombre' => 'Usuario verificado',
            'descripcion' => 'El usuario cuenta con una cuenta verificada.',
            'avatar' => 'url_example'
        ],
        [
            'nombre' => 'Contribuidor Inicial',
            'descripcion' => 'Concedida a aquellos usuarios que han realizado al menos una valoración de una empresa.',
            'avatar' => 'url_example'
        ],
        [
            'nombre' => 'Maestro de las valoraciones',
            'descripcion' => 'Otorgada a los usuarios que han realizado 4 valoraciones o más.',
            'avatar' => 'url_example'
        ],
        [
            'nombre' => 'Contribuidor',
            'descripcion' => 'El usuario ha completado el formulario.',
            'avatar' => 'url_example'
        ],
        [
            'nombre' => 'Nuevas Promesas',
            'descripcion' => 'Concedida a los usuarios que se han unido recientemente al foro y han mostrado un gran potencial para contribuir positivamente a la comunidad.',
            'avatar' => 'url_nuevas_promesas'
        ],
        [
            'nombre' => 'Veterano del Foro',
            'descripcion' => 'Concedida a los usuarios que han sido miembros del foro durante al menos tres años, demostrando su compromiso y contribución continua a la comunidad.',
            'avatar' => 'url_veterano_foro'
        ]
    ];


    public function run(): void
    {
        Insignia::truncate();

        foreach( self::$arrayInsignias as $insignia ) {
            $insigniaNueva = new Insignia;
            $insigniaNueva->nombre = $insignia['nombre'];
            $insigniaNueva->descripcion = $insignia['descripcion'];
            $insigniaNueva->avatar = $insignia['avatar'];
            $insigniaNueva->save();
        }
    }
}
