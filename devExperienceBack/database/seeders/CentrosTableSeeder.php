<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Centro;

class CentrosTableSeeder extends Seeder
{
    private static $arrayCentros = [
        [
            'nombre' => 'CIFP Carlos III',
            'direccion' => 'C. Carlos III, 3, 30201 Cartagena, Murcia',
        ],
        [
            'nombre' => 'CIFP Hespérides',
            'direccion' => 'C. Doña Constanza, 2, 30202 Cartagena, Murcia',
        ],
        [
            'nombre' => 'IES Alfonso X El Sabio',
            'direccion' => 'Av. Don Juan de Borbón, 3, 30007 Murcia',
        ],
        [
            'nombre' => 'IES Aljada',
            'direccion' => 'C. Ermita Vieja, 26, 30006 Puente Tocinos, Murcia',
        ],
        [
            'nombre' => 'IES Antonio Hellín Costa',
            'direccion' => 'Av. del Águila Imperial, 30860 Puerto de Mazarrón, Murcia',
        ],
        [
            'nombre' => 'IES Carthago Spartaria',
            'direccion' => 'C. Manuel Bobadilla, 54, 30593 Cartagena, Murcia',
        ],
        [
            'nombre' => 'IES Dos Mares',
            'direccion' => 'C. Cabo de San Antonio, 22, 30740 San Pedro del Pinatar, Murcia',
        ],
        [
            'nombre' => 'IES El Bohío',
            'direccion' => 'C. Diego Muñoz Calvo, s/n, 30310 Cartagena, Murcia',
        ],
        [
            'nombre' => 'IES Europa',
            'direccion' => 'C/ Miguel Ángel Blanco, s/n, 30880, Águilas',
        ],
        [
            'nombre' => 'IES Francisco Salzillo',
            'direccion' => 'C. Museo de la Huerta, 20, 30820 Alcantarilla, Murcia',
        ],
        [
            'nombre' => 'IES Francisco de Goya',
            'direccion' => 'C. Luchador, 77, 30500 Molina de Segura, Murcia',
        ],
        [
            'nombre' => 'IES Gerardo Molina',
            'direccion' => 'Av. D. Gerardo Molina, 15, 30700 Torre-Pacheco, Murcia',
        ],
        [
            'nombre' => 'IES Ginés Pérez Chirinos',
            'direccion' => 'Calle Dr. Robles, 1, 30400 Caravaca de la Cruz, Murcia',
        ],
        [
            'nombre' => 'IES Infanta Elena',
            'direccion' => 'Av. de la Libertad, 10, 30520 Jumilla, Murcia',
        ],
        [
            'nombre' => 'IES Ingeniero de la Cierva',
            'direccion' => 'C. de la Iglesia, 30012 Murcia',
        ],
        [
            'nombre' => 'IES José Luis Martínez Palomo',
            'direccion' => 'C. Francisco José Vicente Ortega, 4, 30580 Alquerías, Murcia',
        ],
        [
            'nombre' => 'IES José Planes',
            'direccion' => 'C. Maestro Pedro Perez Abadia, 2A, 30100 Espinardo, Murcia',
        ],
        [
            'nombre' => 'IES Los Albares',
            'direccion' => 'C. Vereda de Morcillo, s/n, 30530 Cieza, Murcia',
        ],
        [
            'nombre' => 'IES Miguel Hernández',
            'direccion' => 'C. Miguel Hernández, 17, 30840 Alhama de Murcia, Murcia',
        ],
        [
            'nombre' => 'IES Profesor Pedro Antonio Ruiz Riquelme',
            'direccion' => 'C. Reyes Catolicos, s/n, 30640 Abanilla, Murcia',
        ],
        [
            'nombre' => 'IES Ribera de los Molinos',
            'direccion' => 'C. Molino Pintado, s/n, 30170 Mula, Murcia',
        ],
        [
            'nombre' => 'IES San Juan Bosco',
            'direccion' => 'Francisco de Goya, s/n, 30800 Lorca, Murcia',
        ],
        [
            'nombre' => 'CEIPS Colegio Miralmonte',
            'direccion' => 'Polígono Residencial Santa Ana Plaza Baden Powell, s/n, 30319 Cartagena, Murcia',
        ],
        [
            'nombre' => 'CEIPS San Agustín',
            'direccion' => 'Av. Carrascoy, SN, 30320 Fuente Alamo, Murcia',
        ],
        [
            'nombre' => 'CPR Colegio El OPE',
            'direccion' => 'Av. 12 de Octubre, 30600 Archena, Murcia',
        ],
        [
            'nombre' => 'IES Alcántara',
            'direccion' => 'C. de la Independencia, s/n, 30820 Alcantarilla, Murcia',
        ],
        [
            'nombre' => 'IES Beniaján',
            'direccion' => 'Av. Monteazahar, 30570 Beniaján, Murcia',
        ],
        [
            'nombre' => 'IES San Juan de la Cruz',
            'direccion' => 'Av. Miguel Espinosa, 34, 30400 Caravaca de la Cruz, Murcia',
        ],
        [
            'nombre' => 'IES Vicente Medina',
            'direccion' => 'C. Vaso Ibérico de los Guerreros, s/n, 30600, Murcia',
        ],
        [
            'nombre' => 'CES Vega Media',
            'direccion' => 'Ctra. Mula, 37, 30560 Alguazas, Murcia',
        ],
        [
            'nombre' => 'IES José Luis Castillo Puche',
            'direccion' => 'C. Játiva, 2, 30510 Yecla, Murcia',
        ],
        [
            'nombre' => 'IES Ramón Arcas Meca',
            'direccion' => 'Av. Juan Carlos I, 72, 30800 Lorca, Murcia',
        ],
        [
            'nombre' => 'IES Sanje',
            'direccion' => 'Av. Fernando III el Santo, 28, 30820 Alcantarilla, Murcia',
        ]
    ];

    public function run(): void
    {
        Centro::truncate();

        foreach( self::$arrayCentros as $centro ) {
            $centroNuevo = new Centro;
            $centroNuevo->nombre = $centro['nombre'];
            $centroNuevo->direccion = $centro['direccion'];
            $centroNuevo->imagen = 'https://via.placeholder.com/150';
            $centroNuevo->save();
        }
    }
}
