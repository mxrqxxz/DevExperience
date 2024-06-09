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
            'avatar' => 'Insignia1'
        ],
        [
            'nombre' => 'Contribuidor',
            'descripcion' => 'El usuario ha completado el formulario.',
            'avatar' => 'Insignia2'
        ],
        [
            'nombre' => 'Maestro de los comentarios',
            'descripcion' => 'Otorgada a los usuarios que han realizado 10 comentarios o más.',
            'avatar' => 'Insignia3'
        ],
        [
            'nombre' => 'Nuevo Usuario',
            'descripcion' => 'Concedida a los usuarios que se han unido recientemente.',
            'avatar' => 'Insignia4'
        ],
        [
            'nombre' => 'Usuario de 1 Mes',
            'descripcion' => 'Concedida a los usuarios que han sido miembros durante 1 mes.',
            'avatar' => 'Insignia5'
        ],
        [
            'nombre' => 'Usuario de 6 Meses',
            'descripcion' => 'Concedida a los usuarios que han sido miembros durante 6 meses.',
            'avatar' => 'Insignia6'
        ],
        [
            'nombre' => 'Usuario de 1 Año',
            'descripcion' => 'Concedida a los usuarios que han sido miembros durante 1 año.',
            'avatar' => 'Insignia7'
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
