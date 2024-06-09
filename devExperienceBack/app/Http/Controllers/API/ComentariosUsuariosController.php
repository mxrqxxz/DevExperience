<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ComentariosUsuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        try {
            // Inicializar variables
            $userId = null;
            $reaccion = null;

            // Validar la entrada
            $request->validate([
                'reaccion' => 'nullable|string',
                'comentario_id' => 'required|integer'
            ]);

            // Obtener el usuario autenticado
            $userId = Auth::user()->id;
            $reaccion = $request->reaccion;
            $comentarioId = $request->comentario_id;

            // Buscar si ya existe una reacción del usuario para el comentario
            $comentarioUsuario = ComentariosUsuarios::where('usuario_id', $userId)
                ->where('comentario_id', $comentarioId)
                ->first();

            if ($comentarioUsuario) {
                if ($reaccion == null) {
                    // Si la reacción es null, eliminar la reacción existente
                    $comentarioUsuario->delete();
                    return response()->json(['message' => 'Reacción eliminada'], 200);
                } else {
                    // Si la reacción no es null, actualizar la reacción existente
                    $comentarioUsuario->reaccion = $reaccion;
                    $comentarioUsuario->save();
                }
            } else {
                // Si no existe, crear una nueva reacción
                $comentarioUsuario = new ComentariosUsuarios();
                $comentarioUsuario->usuario_id = $userId;
                $comentarioUsuario->comentario_id = $comentarioId;
                $comentarioUsuario->reaccion = $reaccion;
                $comentarioUsuario->save();
            }

            return response()->json($comentarioUsuario, 200);
        } catch (\Exception $e) {
            // Añadir logs de depuración
            Log::error('Error en store: ' . $e->getMessage(), [
                'userId' => $userId,
                'comentarioId' => $request->comentario_id,
                'reaccion' => $request->reaccion
            ]);

            return response()->json(['message' => 'Error al procesar la solicitud', 'error' => $e->getMessage()], 500);
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
