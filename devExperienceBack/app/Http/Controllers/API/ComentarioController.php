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
        // TODO: Poner que el usuario que comenta sea el usuario logueado, usar auth()->user()->id
        $comentario = new Comentario();
        $comentario->contenido = $request->contenido;
        $comentario->usuario_id = $request->usuario_id;
        $comentario->empresa_id = $request->empresa_id;
        $comentario->save();
        return response()->json($comentario);
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
