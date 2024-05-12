<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\EnviarCorreoMasa;
use App\Mail\FormularioSoporte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EnviarCorreos extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function enviarCorreos(Request $request)
    {
        // Obtener el array de destinatarios de la solicitud
        $destinatarios = $request->input('destinatarios');

        // Concatenar '@alu.murciaeduca.es' a cada elemento del array
        $destinatariosConCorreo = array_map(function ($nre) {
            return $nre . '@alu.murciaeduca.es';
        }, $destinatarios);

        Mail::to($destinatariosConCorreo)->send(new EnviarCorreoMasa());

        return 'Correos enviados correctamente';
    }

    public function enviarCorreoForm(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'mensaje' => 'required|string',
            'email' => 'required|email'
        ]);

        $nombre = $request->input('nombre');
        $mensaje = $request->input('mensaje');
        $email = $request->input('email');

        Mail::to(env('MAIL_USERNAME', 'devexperiencecarlosiii@gmail.com'))->send(new FormularioSoporte($nombre, $mensaje, $email));

        return 'Correo enviado correctamente';
    }
}
