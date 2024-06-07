<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comentario;
use Illuminate\Http\Request;

class ComentarioController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $comentario = new Comentario();
        $comentario->contenido = $request->contenido;
        $comentario->usuario_id = auth()->user()->id;
        $comentario->empresa_id = $request->empresa_id;
        $comentario->save();
        $comentarioDevolver = new Comentario();
        $comentarioDevolver->id = $comentario->id;
        $comentarioDevolver->contenido = $comentario->contenido;
        $comentarioDevolver->likes = 0;
        $comentarioDevolver->dislikes = 0;
        $comentarioDevolver->usuario = auth()->user()->usuario;
        $comentarioDevolver->avatar = auth()->user()->avatar;
        return response()->json($comentarioDevolver);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comentario $comentario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comentario $comentario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comentario $comentario)
    {
        //
    }
}
