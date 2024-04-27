<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;


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
                'descripcion' => $cuenta->descripcion
            ];
        });

        if($user->esProfesor()){
            return response()->json([
                'avatar' => $user->avatar,
                'usuario' => $user->usuario,
                'nombre' => $user->nombre,
                'apellidos' => $user->apellidos,
                'email' => $user->email,
                'cento educativo' => "No aplica",
                'sober_mi' => $user->sober_mi,
                'practicas' => "No aplica",
                'insignias' => $insignias,
                'cuentas' => $cuentas
            ]);
        }else{

            $centro_educativo = $user->practicas_realizadas == 0 ? "Debe completar el formulario" : $user->formulario->centro->nombre;
            $sobre_mi = $user->sobre_mi == null ? "Añade información sobre tí..." : $user->sobre_mi;

            return response()->json([
                'avatar' => $user->avatar,
                'usuario' => $user->usuario,
                'nombre' => $user->nombre,
                'apellidos' => $user->apellidos,
                'cento educativo' => $centro_educativo,
                'sobre_mi' => $sobre_mi,
                'email' => $user->email,
                'practicas' => $user->practicas_realizadas,
                'insignias' => $insignias,
                'cuentas' => $cuentas
            ]);
        }
    }

}
