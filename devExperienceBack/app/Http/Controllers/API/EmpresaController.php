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
        //Recogemos la empresa con el id que nos pasan
        $empresa = Empresa::find($id);
        //Recogemos los formularios de la empresa
        $formularios_empresa = $empresa->formularios;
        //Recogemos el número de formularios de la empresa
        $empresa->formularios->count() > 0 ? $total_formularios_empresas = $empresa->formularios->count() : $total_formularios_empresas = 1;
        //Si no hay formularios, el número de formularios será 1 para evitar divisiones por 0
        $formularios_empresa->count() > 0 ? $numeroFormularios = $formularios_empresa->count() : $numeroFormularios = 1;
        //Recogemos los formularios que referencian a la empresa
        $formularios_empresa = Formulario::where('empresa_id', $id)->get();
        //Recogemos las tecnologías de los formularios de la empresa
        $tecnologias_formularios = TecnologiasFormularios::whereIn('formulario_id', $formularios_empresa->pluck('id'))->get();
        //Agrupamos las tecnologías por id y contamos cuantas veces aparece cada tecnología
        $tecnologias_formularios = $tecnologias_formularios->groupBy('tecnologia_id')->map(function ($item) {
            return $item->count();
        });
        //Obtenemos el nombre de las tecnologías ya que solo tenemos el id
        $tecnologias = Tecnologia::findMany($tecnologias_formularios->keys())->pluck('nombre', 'id');
        // Creamos un array asociativo con el nombre de la tecnología y su número de usos para poder mostrarlo en la vista
        $tecnologias_formularios = $tecnologias_formularios->mapWithKeys(function ($num_usos, $tecnologia_id) use ($tecnologias, $total_formularios_empresas) {
            // Obtenemos la tecnología por ID para acceder al tipo
            $tecnologia = Tecnologia::find($tecnologia_id);
            return [$tecnologia_id => [
                'name' => $tecnologias[$tecnologia_id], // Nombre de la tecnología
                'value' => round($num_usos / $total_formularios_empresas  * 100,1),                   // Número de usos
                'tipo' => $tecnologia->tipo             // Tipo de tecnología
            ]];
        });

        // Filtramos las tecnologías para obtener las de front-end
        $front = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Front-end';
        })->map(function ($item) {
            // Transformamos cada elemento a la estructura deseada, eliminando el campo 'tipo'
            return [
                'name' => $item['name'], // Usamos 'name' para el nombre de la tecnología
                'value' => $item['value'] // Usamos 'value' para el número de usos
            ];
        })->values();
        // Filtramos las tecnologías para obtener las de back-end
        $back = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Back-end';
        })->map(function ($item) {
            // Transformamos cada elemento a la estructura deseada, eliminando el campo 'tipo'
            return [
                'name' => $item['name'], // Usamos 'name' para el nombre de la tecnología
                'value' => $item['value'] // Usamos 'value' para el número de usos
            ];
        })->values();
        // Filtramos las tecnologías para obtener las de control de versiones
        $control_versiones = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Control de versiones';
        })->map(function ($item) {
            // Transformamos cada elemento a la estructura deseada, eliminando el campo 'tipo'
            return [
                'name' => $item['name'], // Usamos 'name' para el nombre de la tecnología
                'value' => $item['value'] // Usamos 'value' para el número de usos
            ];
        })->values();
        // Filtramos las tecnologías para obtener las de base de datos
        $bases_datos = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Base de datos';
        })->map(function ($item) {
            // Transformamos cada elemento a la estructura deseada, eliminando el campo 'tipo'
            return [
                'name' => $item['name'], // Usamos 'name' para el nombre de la tecnología
                'value' => $item['value'] // Usamos 'value' para el número de usos
            ];
        })->values();

        //Calculamos la tasa de contratación
        $tasa_contratacion = $formularios_empresa->where('opcion_quedarse', 1)->count() / $numeroFormularios * 100;
        //Calculamos el porcentaje de usuarios que han recibido un equipo de trabajo en la empresa
        $equipo_trabajo = $formularios_empresa->where('equipo_trabajo', 1)->count() / $numeroFormularios * 100;
        // Agrupamos y contamos cuantas veces aparece cada hora de entrada
        $hora_entrada = $formularios_empresa->groupBy('hora_entrada')->map(function ($item, $key) use ($total_formularios_empresas){
            return ['name' => $key, 'value' => round($item->count() / $total_formularios_empresas * 100, 1)];
        })->values(); // Convertimos a valores para eliminar las claves de agrupación

        // Agrupamos y contamos cuantas veces aparece cada hora de salida
        $hora_salida = $formularios_empresa->groupBy('hora_salida')->map(function ($item, $key) use($total_formularios_empresas){
            return ['name' => $key, 'value' => round($item->count() / $total_formularios_empresas * 100, 1)];
        })->values(); // Convertimos a valores para eliminar las claves de agrupación
        //Creamos un array con los datos de la empresa
        $datosEmpresa = [
            'cabecera' => [
                'nombre' => $empresa->nombre,
                'localizacion' => $empresa->direccion,
                'num_usuarios' => $empresa->formularios->count(),
                'val_media' => $formularios_empresa->avg('val_empresa'),
                'imagen' => $empresa->imagen,
            ],
            'estadisticas' => [
                'remoto' => [
                    ['name' => 'si', 'value' => round($formularios_empresa->where('remoto', 1)->count() / $total_formularios_empresas * 100, 1)],
                    ['name' => 'no', 'value' => round($formularios_empresa->where('remoto', 0)->count() / $total_formularios_empresas * 100, 1)],
                ],
                'front' => $front,
                'back' => $back,
                'control_versiones' => $control_versiones,
                'base_datos' => $bases_datos,
                'jornada' => [
                    ['name' => 'continua', 'value' => round($formularios_empresa->where('tipo_jornada', 'Continua')->count() / $total_formularios_empresas * 100, 1)],
                    ['name' => 'partida', 'value' => round($formularios_empresa->where('tipo_jornada', 'Partida')->count() / $total_formularios_empresas * 100, 1)]
                ],
                'tasa_contratacion' => $tasa_contratacion,
                'val_formacion' => $formularios_empresa->avg('val_formacion'),
                'val_ambiente_trabajo' => $formularios_empresa->avg('val_ambiente_trabajo'),
                'salario_medio' => $formularios_empresa->avg('salario_ofrecido'),
                'tiempo_descanso' => $formularios_empresa->min('tiempo_descanso') . ' - ' . $formularios_empresa->max('tiempo_descanso'),
                'equipo_trabajo' => $equipo_trabajo,
                'hora_entrada' => $hora_entrada,
                'hora_salida' => $hora_salida,
            ],
            'comentarios' => $this->comentarios($empresa),
        ];
        return response()->json($datosEmpresa);
    }

    private function comentarios(Empresa $empresa)
    {
        //Recogemos los comentarios de la empresa
        $comentarios = $empresa->comentarios;
        //Recogemos las interacciones de los comentarios
        $interaccionesComentarios = ComentariosUsuarios::all();
        //Creamos un array con vacio para añaadir los datos necesarios para mostrar en la vista
        $comentariosFinales = [];

        foreach ($comentarios as $comentario) {
            $likes = $interaccionesComentarios->where('comentario_id', $comentario->id)->where('reaccion', 'like')->count();
            $dislikes = $interaccionesComentarios->where('comentario_id', $comentario->id)->where('reaccion', 'dislike')->count();
            $usuario = $comentario->usuario;
            $comentarioFinal = [
                'id' => $comentario->id,
                'contenido' => $comentario->contenido,
                'likes' => $likes,
                'dislikes' => $dislikes,
                'usuario' => $usuario->usuario,
                'avatar' => $usuario->avatar,
            ];
            array_push($comentariosFinales, $comentarioFinal);
        }
        return $comentariosFinales;
    }

    public function store(Request $request)
    {
        $empresa = new Empresa();
        $empresa->CIF = $request->CIF;
        $empresa->nombre = $request->nombre;
        $empresa->direccion = $request->direccion;
        if ($request->file('imagen')) {
            $request->validate([
                'imagen' => 'mimes:png,jpg,jpeg|max:5120', // Se permiten imagenes de hasta 5 MB
            ], [
                'imagen.mimes' => 'El archivo debe ser una imagen.',
                'imagen.max' => 'El tamaño de la imagen no debe ser mayor a 5 MB.',
            ]);

            $path = $request->file('imagen')->store('imagenesEmpresas', ['disk' => 'public']);
            $empresa->imagen = $path;
        } else {
            $empresa->imagen = $empresa->imagen;
        }

        $empresa->save();
        return response()->json($empresa);
    }
}
