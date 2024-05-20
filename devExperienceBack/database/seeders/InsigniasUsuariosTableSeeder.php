<?php

namespace Database\Seeders;

use App\Models\Insignia;
use App\Models\InsigniasUsuarios;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InsigniasUsuariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        InsigniasUsuarios::truncate();

       /*  $insignias = Insignia::all();
        $usuarios = User::all();

        foreach ($usuarios as $usuario) {
            $numeroInsignias = rand(1, 5);

            $insigniasYaOtorgadas = collect();

            for ($i = 0; $i < $numeroInsignias; $i++) {

                $insignia = $insignias->whereNotIn('id', $insigniasYaOtorgadas)->random();

                $insigniasYaOtorgadas->push($insignia->id);

                $registro = new InsigniasUsuarios();
                $registro->usuario_id = $usuario->id;
                $registro->insignia_id = $insignia->id;
                $registro->save();
            }
        } */
    }
}
