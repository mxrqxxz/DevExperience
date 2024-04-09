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
            'tipo' => 'Front-end',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Angular',
            'tipo' => 'Front-end',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Vue.js',
            'tipo' => 'Front-end',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Ember.js',
            'tipo' => 'Front-end',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Svelte',
            'tipo' => 'Front-end',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Express.js',
            'tipo' => 'Back-end',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Django',
            'tipo' => 'Back-end',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Spring Boot',
            'tipo' => 'Back-end',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Ruby on Rails',
            'tipo' => 'Back-end',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Laravel',
            'tipo' => 'Back-end',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Git',
            'tipo' => 'Control de versiones',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'SVN',
            'tipo' => 'Control de versiones',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Mercurial',
            'tipo' => 'Control de versiones',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Perforce',
            'tipo' => 'Control de versiones',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'MySQL',
            'tipo' => 'Base de datos',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'PostgreSQL',
            'tipo' => 'Base de datos',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'SQLite',
            'tipo' => 'Base de datos',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'MongoDB',
            'tipo' => 'Base de datos',
            'logo' => 'url_example'
        ],
        [
            'nombre' => 'Cassandra',
            'tipo' => 'Base de datos',
            'logo' => 'url_example'
        ]
    ];

    public function run(): void
    {
        Tecnologia::truncate();

        foreach( self::$arrayTecnologias as $tecnologia ) {
            $tecnologiaNueva = new Tecnologia;
            $tecnologiaNueva->nombre = $tecnologia['nombre'];
            $tecnologiaNueva->tipo = $tecnologia['tipo'];
            $tecnologiaNueva->logo = $tecnologia['logo'];
            $tecnologiaNueva->save();
        }
    }
}
