<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cuenta;


class CuentasTableSeeder extends Seeder
{
    private static $arrayCuentas = [
        [
            'nombre' => 'Github'
        ],
        [
            'nombre' => 'LinkedIn'
        ]
    ];


    public function run(): void
    {
        Cuenta::truncate();

        foreach( self::$arrayCuentas as $cuenta ) {
            $cuentaNueva = new Cuenta;
            $cuentaNueva->nombre = $cuenta['nombre'];
            $cuentaNueva->save();
        }
    }
}
