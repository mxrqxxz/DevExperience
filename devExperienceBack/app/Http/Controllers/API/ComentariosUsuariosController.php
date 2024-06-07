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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $comentario = new ComentariosUsuarios();
        $comentario->reaccion = $request->reaccion;
        $comentario->usuario_id = auth()->user()->id;
        $comentario->comentario_id = $request->comentario_id;
        $comentario->save();
        return response()->json($comentario);
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
