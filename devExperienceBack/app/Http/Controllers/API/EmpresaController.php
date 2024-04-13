<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\Formulario;
use App\Models\Tecnologia;
use App\Models\TecnologiasFormularios;
use App\Models\ComentariosUsuarios;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $empresa = Empresa::find($id);
        $formularios_empresa = $empresa->formularios;
        $formularios_empresa->count() > 0 ? $numeroFormularios = $formularios_empresa->count() : $numeroFormularios = 1;

        $formularios_empresa = Formulario::where('empresa_id', $id)->get();
        //ahora quiero sacar los registros de la tabla tecnologias_formularios que tengan un formulario_id que esté en la colección de formularios_empresa
        $tecnologias_formularios = TecnologiasFormularios::whereIn('formulario_id', $formularios_empresa->pluck('id'))->get();

        //ahora quiero agrupar por tecnologia_id y contar cuantas veces aparece cada tecnología
        $tecnologias_formularios = $tecnologias_formularios->groupBy('tecnologia_id')->map(function ($item) {
            return $item->count();
        });

        //ahora quiero obtener el nombre de las tecnologías
        $tecnologias = Tecnologia::findMany($tecnologias_formularios->keys())->pluck('nombre', 'id');

        //ahora quiero crear un array asociativo con el nombre de la tecnología y el número de veces que aparece y el tipo de tecnología
        $tecnologias_formularios = $tecnologias_formularios->mapWithKeys(function ($num_usos, $tecnologia_id) use ($tecnologias) {
            $tecnologia = Tecnologia::find($tecnologia_id);
            return [$tecnologias[$tecnologia_id] => ['num_usos' => $num_usos, 'tipo' => $tecnologia->tipo]];
        });

        $front = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Front-end';
        })->transform(function ($item) {
            unset($item['tipo']);
            return $item;
        });

        $back = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Back-end';
        })->transform(function ($item) {
            unset($item['tipo']);
            return $item;
        });

        $control_versiones = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Control de versiones';
        })->transform(function ($item) {
            unset($item['tipo']);
            return $item;
        });

        $bases_datos = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Base de datos';
        })->transform(function ($item) {
            unset($item['tipo']);
            return $item;
        });

        $tasa_contratacion = $formularios_empresa->where('opcion_quedarse', 1)->count() / $numeroFormularios*100;
        $equipo_trabajo = $formularios_empresa->where('equipo_trabajo', 1)->count() / $numeroFormularios*100;
        //ahora quiero sacar la hora de entrada y la hora de salida agrupada y contar cuantas veces aparece cada hora
        $hora_entrada = $formularios_empresa->groupBy('hora_entrada')->map(function ($item) {
            return $item->count();
        });

        $hora_salida = $formularios_empresa->groupBy('hora_salida')->map(function ($item) {
            return $item->count();
        });

        $datosEmpresa = [
            'cabecera' =>[
                'nombre' => $empresa->nombre,
                'localizacion' => $empresa->direccion,
                'num_usuarios' => $empresa->formularios->count(),
                'val-media' => $formularios_empresa->avg('val_empresa')
            ],
            'estadisticas' => [
                'remoto'=>[
                    'si'=>$formularios_empresa->where('remoto', 1)->count(),
                    'no'=>$formularios_empresa->where('remoto', 0)->count()],
                'front'=> $front,
                'back'=> $back,
                'control_versiones'=> $control_versiones,
                'base_datos'=> $bases_datos,
                'jornada'=>[
                    'continua'=>$formularios_empresa->where('tipo_jornada', 'Continua')->count(),
                    'partida'=>$formularios_empresa->where('tipo_jornada','Partida')->count()],
                'tasa_contratacion'=>$tasa_contratacion,
                'val_formacion'=>$formularios_empresa->avg('val_formacion'),
                'val_ambiente_trabajo'=>$formularios_empresa->avg('val_ambiente_trabajo'),
                'salario_medio'=>$formularios_empresa->avg('salario_ofrecido'),
                'tiempo_descanso'=>$formularios_empresa->min('tiempo_descanso') . ' - ' . $formularios_empresa->max('tiempo_descanso'),
                'equipo_trabajo'=>$equipo_trabajo,
                'hora_entrada'=>$hora_entrada,
                'hora_salida'=>$hora_salida,
            ],
            'comentarios' => $this->comentarios($empresa),
        ];
        return response()->json($datosEmpresa);
    }

    private function comentarios(Empresa $empresa)
    {
        $comentarios = $empresa->comentarios;
        $interaccionesComentarios = ComentariosUsuarios::all();
        $comentariosFinales = [];

        foreach ($comentarios as $comentario) {
            $likes = $interaccionesComentarios->where('comentario_id', $comentario->id)->where('reaccion', 'like')->count();
            $dislikes = $interaccionesComentarios->where('comentario_id', $comentario->id)->where('reaccion', 'dislike')->count();
            $comentarioFinal = [
                'contenido' => $comentario->contenido,
                'likes' => $likes,
                'dislikes' => $dislikes
            ];
            array_push($comentariosFinales, $comentarioFinal);
        }
        return $comentariosFinales;
    }

}
