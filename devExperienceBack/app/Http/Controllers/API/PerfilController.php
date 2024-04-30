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
                'cuentas' => $cuentas,
                'cat_cuentas'=> $cat_cuentas
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
                'cuentas' => $cuentas,
                'cat_cuentas'=> $cat_cuentas
            ]);
        }
    }

    public function actualizarPerfil(Request $request)
    {
        $user = Auth::user();
        $cuentas = $request->cuentas;

        if($userRepoAvatar = $request->file('avatar')) {
            $request->validate([
                'avatar' => 'mimes:png,jpg,jpeg|max:5120', // Se permiten imagenes de hasta 5 MB
            ], [
                'avatar.mimes' => 'El avatar debe ser una imagen.',
                'avatar.max' => 'El tamaño del avatar no debe ser mayor a 5 MB.',
            ]);

            $path = $userRepoAvatar->store('imagenesEmpresas', ['disk' => 'public']);
            $user['avatar'] = $path;
        } else {
            $user['avatar'] = $user->avatar;
        }

        $user->avatar = $request->avatar;
        $user->usuario = $request->usuario;
        $user->nombre = $request->nombre;
        $user->apellidos = $request->apellidos;
        $user->sobre_mi = $request->sobre_mi;
        $user->email = $request->email;

        $user->save();

        return response()->json([
            'message' => 'Perfil actualizado correctamente'
        ]);
    }

}
