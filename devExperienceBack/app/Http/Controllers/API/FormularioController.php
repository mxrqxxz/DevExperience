<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Formulario;
use App\Models\Tecnologia;
use App\Models\TecnologiasFormularios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormularioController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formulario = new Formulario();
        $formulario->remoto = $request->remoto;
        $formulario->opcion_quedarse = $request->opcion_quedarse;
        $formulario->salario_ofrecido = $request->salario_ofrecido;
        $formulario->val_empresa = $request->val_empresa;
        $formulario->val_formacion = $request->val_formacion;
        $formulario->val_ambiente_trabajo = $request->val_ambiente_trabajo;
        $formulario->tipo_jornada = $request->tipo_jornada;
        $formulario->hora_entrada = $request->hora_entrada;
        $formulario->hora_salida = $request->hora_salida;
        $formulario->tiempo_descanso = (int)$request->tiempo_descanso;
        $formulario->equipo_trabajo = $request->equipo_trabajo;
        $formulario->empresa_id = $request->empresa_id;
        $formulario->centro_id = $request->centro_id;
        $formulario->usuario_id = Auth::user()->id;
        $formulario->save();

        // Crear array de tecnologías y verificar existencia
        $tecnologias = [
            (int) $request->backend_id,
            (int) $request->frontend_id,
            (int) $request->control_version_id,
            (int) $request->bd_id
        ];

        foreach ($tecnologias as $tecnologia) {
            if (!Tecnologia::find($tecnologia)) {
                return response()->json(['message' => 'Una o más tecnologías no existen.'], 400);
            }
        }

        // Guardar las tecnologías en la tabla 'tecnologias_formularios'
        foreach ($tecnologias as $tecnologia) {
            $tecnologia_formulario = new TecnologiasFormularios();
            $tecnologia_formulario->formulario_id = $formulario->id;
            $tecnologia_formulario->tecnologia_id = $tecnologia;
            $tecnologia_formulario->save();
        }
        return response()->json(['message' => 'Formulario enviado con éxito'], 200);

    }

}
