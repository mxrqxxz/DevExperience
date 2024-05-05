<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\EnviarCorreoMasa;
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
}
