<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\Formulario;
use App\Models\Tecnologia;
use App\Models\TecnologiasFormularios;
use Illuminate\Http\Request;

class EstadisticasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function estadisticas()
    {
        $tecnologias_formularios = TecnologiasFormularios::all();
        $tecnologias_formularios = $tecnologias_formularios->groupBy('tecnologia_id')->map(function ($item) {
            return $item->count();
        });
        $tecnologias = Tecnologia::findMany($tecnologias_formularios->keys())->pluck('nombre', 'id');
        $tecnologias_formularios = $tecnologias_formularios->mapWithKeys(function ($num_usos, $tecnologia_id) use ($tecnologias) {
            $tecnologia = Tecnologia::find($tecnologia_id);
            return [$tecnologias[$tecnologia_id] => ['name' => $tecnologia->nombre, 'value' => $num_usos, 'tipo' => $tecnologia->tipo]];
        });

        //Filtramos las tecnologías para obtener las de front-end y devolvemos maximo 5
        $front = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Front-end';
        })->transform(function ($item) {
            unset($item['tipo']);
            return $item;
        })->sortByDesc('value')->take(5)->values()->all();;

        //Filtramos las tecnologías para obtener las de back-end
        $back = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Back-end';
        })->transform(function ($item) {
            unset($item['tipo']);
            return $item;
        })->sortByDesc('num_usos')->take(5)->values()->all();;

        //Filtramos las tecnologías para obtener las de control de versiones
        $control_versiones = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Control de versiones';
        })->transform(function ($item) {
            unset($item['tipo']);
            return $item;
        })->sortByDesc('num_usos')->take(5)->values()->all();;

        //Filtramos las tecnologías para obtener las de base de datos
        $bases_datos = $tecnologias_formularios->filter(function ($tecnologia) {
            return $tecnologia['tipo'] == 'Base de datos';
        })->transform(function ($item) {
            unset($item['tipo']);
            return $item;
        })->sortByDesc('num_usos')->take(5)->values()->all();

        $estadisticas_tecnologias = [
            'front' => $front,
            'back' => $back,
            'control_versiones' => $control_versiones,
            'bases_datos' => $bases_datos
        ];

        $formularios = Formulario::with('empresa')->get();

        $estadisticas_empresas = $formularios->groupBy('empresa_id')->mapWithKeys(function ($item, $key) {
            $empresa = $item->first()->empresa;
            return [[
                'name' => $empresa->nombre,
                'value' => $item->sum('opcion_quedarse'),
                'href' => $empresa->imagen_url
            ]];
        })->sortByDesc(function ($value) {

            return $value['value'];
        })->values()->all();


        $estadisticas_generales = [
            'estadisticas_tecnologias' => $estadisticas_tecnologias,
            'estadisticas_empresas' => $estadisticas_empresas,
        ];
        return response()->json($estadisticas_generales);
    }
}
