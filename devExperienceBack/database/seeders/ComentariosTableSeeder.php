<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comentario;
use App\Models\User;
use App\Models\Empresa;


class ComentariosTableSeeder extends Seeder
{

    public function run(): void
    {
        Comentario::truncate();

        $users = User::all();
        $empresas = Empresa::all();

        foreach($users as $user) {
            $comentarioNuevo = new Comentario;
            $comentarioNuevo->contenido = fake()->sentence();
            $comentarioNuevo->usuario_id = $user->id;
            $comentarioNuevo->empresa_id = $empresas->random()->id;
            $comentarioNuevo->save();
        }
    }
}
