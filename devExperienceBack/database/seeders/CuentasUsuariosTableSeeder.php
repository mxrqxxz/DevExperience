<?php

namespace Database\Seeders;

use App\Models\Cuenta;
use App\Models\CuentasUsuarios;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CuentasUsuariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CuentasUsuarios::truncate();

        $users = User::all();
        $cuentas = Cuenta::all();

        foreach ($users as $user) {

            foreach ($cuentas as $cuenta) {

                $registro = new CuentasUsuarios();
                $registro->usuario_id = $user->id;
                $registro->cuenta_id = $cuenta->id;

                if($cuenta->nombre === 'Github'){
                    $registro->url = 'https://github.com/' . $user->usuario;
                }else{
                    $registro->url = 'https://www.linkedin.com/in/' . $user->usuario;
                }

                $registro->save();

            }
        }


    }
}
