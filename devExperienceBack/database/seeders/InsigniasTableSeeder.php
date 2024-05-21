<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Insignia;

class InsigniasTableSeeder extends Seeder
{
    private static $arrayInsignias = [
        [
            'nombre' => 'Maestro de las valoraciones',
            'descripcion' => 'Otorgada a los usuarios que han realizado 4 valoraciones o más.',
            'avatar' => 'insignia1.svg'
        ],
        [
            'nombre' => 'Contribuidor',
            'descripcion' => 'El usuario ha completado el formulario.',
            'avatar' => 'insignia2.svg'
        ],
        [
            'nombre' => 'Maestro de los comentarios',
            'descripcion' => 'Otorgada a los usuarios que han realizado 10 comentarios o más.',
            'avatar' => 'insignia3.svg'
        ],
        [
            'nombre' => 'Nuevo Usuario',
            'descripcion' => 'Concedida a los usuarios que se han unido recientemente.',
            'avatar' => 'insignia4.svg'
        ],
        [
            'nombre' => 'Usuario de 1 Mes',
            'descripcion' => 'Concedida a los usuarios que han sido miembros durante 1 mes.',
            'avatar' => 'insignia5.svg'
        ],
        [
            'nombre' => 'Usuario de 6 Meses',
            'descripcion' => 'Concedida a los usuarios que han sido miembros durante 6 meses.',
            'avatar' => 'insignia6.svg'
        ],
        [
            'nombre' => 'Usuario de 1 Año',
            'descripcion' => 'Concedida a los usuarios que han sido miembros durante 1 año.',
            'avatar' => 'insignia7.svg'
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
