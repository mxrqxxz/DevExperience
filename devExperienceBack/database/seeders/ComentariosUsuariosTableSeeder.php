<?php

namespace Database\Seeders;

use App\Models\Comentario;
use App\Models\ComentariosUsuarios;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComentariosUsuariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ComentariosUsuarios::truncate();

        $comentarios = Comentario::all();
        $usuarios = User::all();

        foreach ($usuarios as $usuario) {
            $numeroComentarios = rand(1, 5);

            $comentariosYaReaccionados = collect();

            for ($i = 0; $i < $numeroComentarios; $i++) {

                $comentario = $comentarios->whereNotIn('id', $comentariosYaReaccionados)->random();

                $comentariosYaReaccionados->push($comentario->id);

                $reaccion = rand(0, 1) ? 'like' : 'dislike';

                $registro = new ComentariosUsuarios();
                $registro->usuario_id = $usuario->id;
                $registro->comentario_id = $comentario->id;
                $registro->reaccion = $reaccion;
                $registro->save();
            }
        }
    }
}
