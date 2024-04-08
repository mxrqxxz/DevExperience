<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Empresa;

class EmpresasTableSeeder extends Seeder
{
    private static $arrayEmpresas = [
        [
            'CIF' => 'A-28599033',
            'nombre' => 'Indra Sistemas S.A.',
            'direccion' => 'Parque Tecnológico de Fuente Alamo Ctra. del Estrecho-Lobosillo, Km 2, Parcela 2.9.1, 30320 Fuente Alamo, Murcia',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'B-12345678',
            'nombre' => 'Telefónica España S.A.',
            'direccion' => 'Calle Gran Vía, 28, 28013 Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'C-98765432',
            'nombre' => 'Amadeus IT Group S.A.',
            'direccion' => 'Calle Salvador de Madariaga, 1, 28027 Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'D-87654321',
            'nombre' => 'Accenture España S.L.',
            'direccion' => 'Avenida Diagonal, 605, 08028 Barcelona',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'E-76543210',
            'nombre' => 'Everis Spain S.L.U.',
            'direccion' => 'Calle Mahonia, 2, 28043 Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'F-65432109',
            'nombre' => 'Atos Spain S.A.',
            'direccion' => 'Calle Albarracín, 25, 28037 Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'G-54321098',
            'nombre' => 'IBM España S.A.',
            'direccion' => 'Calle Santa Hortensia, 26, 28002 Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'H-43210987',
            'nombre' => 'Capgemini España S.L.',
            'direccion' => 'Paseo de la Castellana, 77, 28046 Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'I-32109876',
            'nombre' => 'Fujitsu Technology Solutions S.A.',
            'direccion' => 'Calle de Santa Hortensia, 26, 28002 Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'J-21098765',
            'nombre' => 'Hewlett Packard Enterprise (HPE) España S.L.',
            'direccion' => 'Calle Princesa, 31, 28008 Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'K-10987654',
            'nombre' => 'Oracle España S.L.',
            'direccion' => 'Paseo de la Finca, 1, 28223 Pozuelo de Alarcón, Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'L-09876543',
            'nombre' => 'SAP España S.L.',
            'direccion' => 'Calle Kronos, 63, 28037 Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'M-98765432',
            'nombre' => 'Cisco Systems Spain S.L.',
            'direccion' => 'Avenida de Bruselas, 24, 28108 Alcobendas, Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'N-87654321',
            'nombre' => 'Microsoft Ibérica S.R.L.',
            'direccion' => 'Paseo de la Finca, 1, 28223 Pozuelo de Alarcón, Madrid',
            'imagen' => 'url_example',
        ],
        [
            'CIF' => 'O-76543210',
            'nombre' => 'Google Spain S.L.',
            'direccion' => 'Torre Picasso, Plaza Pablo Ruiz Picasso, 1, 28020 Madrid',
            'imagen' => 'url_example',
        ],
    ];


    public function run(): void
    {
        Empresa::truncate();

        foreach( self::$arrayEmpresas as $empresa ) {
            $empresaNueva = new Empresa;
            $empresaNueva->CIF = $empresa['CIF'];
            $empresaNueva->nombre = $empresa['nombre'];
            $empresaNueva->direccion = $empresa['direccion'];
            $empresaNueva->imagen = $empresa['imagen'];
            $empresaNueva->save();
        }
    }
}
