<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cuenta;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;


class PerfilController extends Controller
{
    public function datosPerfil()
    {
        $user = Auth::user();

        $insignias = $user->insignias->map(function ($insignia) {
            return [
                'nombre' => $insignia->nombre,
                'avatar' => $insignia->avatar,
                'descripcion' => $insignia->descripcion
            ];
        });

        $cuentas = $user->cuentas->map(function ($cuenta) {
            return [
                'nombre' => $cuenta->nombre,
                'avatar' => $cuenta->avatar,
                'url' => $cuenta->pivot->url, // Se accede a la URL a través del atributo 'pivot
                'descripcion' => $cuenta->descripcion
            ];
        });

        $cat_cuentas = Cuenta::all()->map(function ($cuenta) {
            return [
                'id' => $cuenta->id,
                'nombre' => $cuenta->nombre,
                'avatar' => $cuenta->avatar
            ];
        });

        if ($user->esProfesor()) {
            return response()->json([
                'avatar' => $user->avatar,
                'usuario' => $user->usuario,
                'nombre' => $user->nombre,
                'apellidos' => $user->apellidos,
                'email' => $user->email,
                'centro_educativo' => "No aplica",
                'sobre_mi' => $user->sobre_mi,
                'practicas' => "No aplica",
                'insignias' => $insignias,
                'cuentas' => $cuentas,
                'cat_cuentas' => $cat_cuentas
            ]);
        } else {

            $centro_educativo = $user->practicas_realizadas == 0 ? "Debe completar el formulario" : $user->formulario->centro->nombre;
            $sobre_mi = $user->sobre_mi == null ? "Añade información sobre tí..." : $user->sobre_mi;

            return response()->json([
                'avatar' => $user->avatar,
                'usuario' => $user->usuario,
                'nombre' => $user->nombre,
                'apellidos' => $user->apellidos,
                'centro_educativo' => $centro_educativo,
                'sobre_mi' => $sobre_mi,
                'email' => $user->email,
                'practicas' => $user->practicas_realizadas,
                'insignias' => $insignias,
                'cuentas' => $cuentas,
                'cat_cuentas' => $cat_cuentas
            ]);
        }
    }

    public function actualizarPerfil(Request $request)
    {
        // Obtener el usuario autenticado
        $user = Auth::user();
        $cuentas = json_decode($request->cuentas, true);
        // Validar el avatar
        if ($request->file('avatar')) {
            $request->validate([
                'avatar' => 'mimes:png,jpg,jpeg|max:5120', // Se permiten imagenes de hasta 5 MB
            ], [
                'avatar.mimes' => 'El avatar debe ser una imagen.',
                'avatar.max' => 'El tamaño del avatar no debe ser mayor a 5 MB.',
            ]);

            $path = $request->file('avatar')->store('imagenesPerfil', ['disk' => 'public']);
            $user->avatar = $path;
        } else {
            $user->avatar = $user->avatar;
        }
        // Actualizar las cuentas, recorriendo el array de cuentas
        foreach ($cuentas as $cuenta) {
            $pivotData = ['url' => $cuenta['url']];

            // Primero intenta obtener el registro pivot
            $pivot = $user->cuentas()->wherePivot('cuenta_id', $cuenta['cuenta_id'])->first();

            if ($pivot) {
                // Actualizar si existe
                $user->cuentas()->updateExistingPivot($cuenta['cuenta_id'], $pivotData);
            } else {
                // Adjuntar si no existe
                $user->cuentas()->attach($cuenta['cuenta_id'], $pivotData);
            }
        }
        // Actualizar los datos del usuario
        $user->usuario = $request->usuario;
        $user->nombre = $request->nombre;
        $user->apellidos = $request->apellidos;
        $user->sobre_mi = $request->sobre_mi;
        $user->email = $request->email;
        //Guardar los cambios
        $user->save();

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
        ]);
    }
}
