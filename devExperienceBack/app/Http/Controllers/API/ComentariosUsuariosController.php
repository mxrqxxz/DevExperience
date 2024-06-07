<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ComentariosUsuarios;
use Illuminate\Http\Request;

class ComentariosUsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function store(Request $request)
    {

        // Obtener el usuario autenticado
        $userId = auth()->user()->id;

        // Buscar si ya existe una reacción del usuario para el comentario
        $comentarioUsuario = ComentariosUsuarios::where('usuario_id', $userId)
                                                ->where('comentario_id', $request->comentario_id)
                                                ->first();

        if ($comentarioUsuario) {
            // Si ya existe, actualizar la reacción
            $comentarioUsuario->reaccion = $request->reaccion;
            $comentarioUsuario->save();
        } else {
            // Si no existe, crear una nueva reacción
            $comentarioUsuario = new ComentariosUsuarios();
            $comentarioUsuario->usuario_id = $userId;
            $comentarioUsuario->comentario_id = $request->comentario_id;
            $comentarioUsuario->reaccion = $request->reaccion;
            $comentarioUsuario->save();
        }

    }


    /**
     * Display the specified resource.
     */
    public function show(ComentariosUsuarios $comentariosUsuarios)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ComentariosUsuarios $comentariosUsuarios)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ComentariosUsuarios $comentariosUsuarios)
    {
        //
    }
}
