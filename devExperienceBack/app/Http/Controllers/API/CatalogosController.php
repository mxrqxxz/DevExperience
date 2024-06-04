<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Centro;
use App\Models\Empresa;
use App\Models\Tecnologia;
use Illuminate\Http\Request;

class CatalogosController extends Controller
{
   public function getCatalogos()
   {
    $centros = Centro::select('id', 'nombre')->get();
    $empresas = Empresa::select('id', 'nombre')->get();
    $front = Tecnologia::select('id', 'nombre')->where('tipo','Front-end')->get();
    $back = Tecnologia::select('id', 'nombre')->where('tipo','Back-end')->get();
    $control = Tecnologia::select('id', 'nombre')->where('tipo','Control de versiones')->get();
    $bd = Tecnologia::select('id', 'nombre')->where('tipo','Base de datos')->get();

    return response()->json([
        'centros' => $centros,
        'empresas' => $empresas,
        'front' => $front,
        'back' => $back,
        'control' => $control,
        'bd' => $bd
    ]);
   }
}
