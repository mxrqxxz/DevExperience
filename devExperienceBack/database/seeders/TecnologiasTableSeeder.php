<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tecnologia;


class TecnologiasTableSeeder extends Seeder
{
    private static $arrayTecnologias = [
        [
            'nombre' => 'React',
            'tipo' => 'Front-end'
        ],
        [
            'nombre' => 'Angular',
            'tipo' => 'Front-end'
        ],
        [
            'nombre' => 'Vue.js',
            'tipo' => 'Front-end'
        ],
        [
            'nombre' => 'Ember.js',
            'tipo' => 'Front-end'
        ],
        [
            'nombre' => 'Svelte',
            'tipo' => 'Front-end'
        ],
        [
            'nombre' => 'Express.js',
            'tipo' => 'Back-end'
        ],
        [
            'nombre' => 'Django',
            'tipo' => 'Back-end'
        ],
        [
            'nombre' => 'Spring Boot',
            'tipo' => 'Back-end'
        ],
        [
            'nombre' => 'Ruby on Rails',
            'tipo' => 'Back-end'
        ],
        [
            'nombre' => 'Laravel',
            'tipo' => 'Back-end'
        ],
        [
            'nombre' => 'Git',
            'tipo' => 'Control de versiones'
        ],
        [
            'nombre' => 'SVN',
            'tipo' => 'Control de versiones'
        ],
        [
            'nombre' => 'Mercurial',
            'tipo' => 'Control de versiones'
        ],
        [
            'nombre' => 'Perforce',
            'tipo' => 'Control de versiones'
        ],
        [
            'nombre' => 'MySQL',
            'tipo' => 'Base de datos'
        ],
        [
            'nombre' => 'PostgreSQL',
            'tipo' => 'Base de datos'
        ],
        [
            'nombre' => 'SQLite',
            'tipo' => 'Base de datos'
        ],
        [
            'nombre' => 'MongoDB',
            'tipo' => 'Base de datos'
        ],
        [
            'nombre' => 'Cassandra',
            'tipo' => 'Base de datos'
        ]
    ];

    public function run(): void
    {
        Tecnologia::truncate();

        foreach( self::$arrayTecnologias as $tecnologia ) {
            $tecnologiaNueva = new Tecnologia;
            $tecnologiaNueva->nombre = $tecnologia['nombre'];
            $tecnologiaNueva->tipo = $tecnologia['tipo'];
            $tecnologiaNueva->save();
        }
    }
}
