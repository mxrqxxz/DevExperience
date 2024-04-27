<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cuenta;


class CuentasTableSeeder extends Seeder
{
    private static $arrayCuentas = [
        [
            'nombre' => 'Github',
            'avatar' => 'https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_github_icon_130816.png'
        ],
        [
            'nombre' => 'LinkedIn',
            'avatar' => 'https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_linkedin_icon_130813.png'
        ],

    ];


    public function run(): void
    {
        Cuenta::truncate();

        foreach( self::$arrayCuentas as $cuenta ) {
            $cuentaNueva = new Cuenta;
            $cuentaNueva->nombre = $cuenta['nombre'];
            $cuentaNueva->avatar = $cuenta['avatar'];
            $cuentaNueva->save();
        }
    }
}
