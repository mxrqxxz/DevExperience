<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $empresa = Empresa::find($id);

        $datosEmpresa = [
            'cabecera' =>[
                'nombre' => $empresa->nombre,
                'localizacion' => $empresa->direccion,
                'num_usuarios' => $empresa->formularios->count(),
                'val-media' => $empresa->formularios->avg('val_empresa')
            ],
            'estadisticas' => [
                'remoto'=>[
                    'si'=>$empresa->formularios->where('remoto', 1)->count(),
                    'no'=>$empresa->formularios->where('remoto', 0)->count()],
                'front'=>'',
                'back'=>'',
                'control-versiones'=>'',
                'bases-datos'=>'',
                'jornada'=>'',
                'tasa-contratacion'=>'',
                'val-formacion'=>'',
                'val-ambiente-laboral'=>'',
                'salario-medio'=>'',
                'tiempo-descanso'=>'',
                'equipo-trabajo'=>'',
                'hora-entrada'=>'',
                'hora-salida'=>'',
            ],
            'comentarios' => [],
        ];
        return response()->json($datosEmpresa);
    }

}
