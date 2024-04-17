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
        $estadisticas_generales = [
            'estadisticas_tecnologias' => $this->tecnologias(),
            'estadisticas_empresas' => $this->empresas(),
        ];
        return response()->json($estadisticas_generales);
    }

    public function tecnologias()
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

        $estadisticas_tecnologias = [
            'front' => $this->dividirTecnologias($tecnologias_formularios, 'Front-end'),
            'back' => $this->dividirTecnologias($tecnologias_formularios, 'Back-end'),
            'control_versiones' => $this->dividirTecnologias($tecnologias_formularios, 'Control de versiones'),
            'bases_datos' => $this->dividirTecnologias($tecnologias_formularios, 'Base de datos')
        ];

        return $estadisticas_tecnologias;
    }

    public function dividirTecnologias($array, $tipo)
    {
        //Filtramos las tecnologías para obtener las de front-end y devolvemos maximo 5
        $tecnologiasFiltradas = $array->filter(function ($tecnologia) use ($tipo){
            return $tecnologia['tipo'] == $tipo;
        })->transform(function ($item) {
            unset($item['tipo']);
            return $item;
        })->sortByDesc('value')->take(5)->values()->all();;

        return $tecnologiasFiltradas;
    }

    public function empresas()
    {
        $formularios = Formulario::all();

        $practicas = $formularios->groupBy('empresa_id')->map(function ($item) {
            return [
                'name' => Empresa::find($item->first()->empresa_id)->nombre,
                'value' => $item->count()
            ];
        })->sortByDesc('value')->take(5)->values()->all();

        $contratos = $formularios->groupBy('empresa_id')->map(function ($item) {
            $numeroContratos = $item->where('opcion_quedarse', 1)->count();
            return [
                'name' => Empresa::find($item->first()->empresa_id)->nombre,
                'value' => $numeroContratos

            ];
        })->sortByDesc('value')->take(5)->values()->all();

        $salarios = $formularios->groupBy('empresa_id')->map(function ($item) {
            $salario = $item->where('salario_ofrecido', '>', 0)->avg('salario_ofrecido');
            return [
                'name' => Empresa::find($item->first()->empresa_id)->nombre,
                'value' => floor($salario)
            ];
        })->sortByDesc('value')->take(5)->values()->all();

        $remotos = $formularios->groupBy('empresa_id')->map(function ($item) {
            $remoto = $item->where('remoto', 1)->count();
            return [
                'name' => Empresa::find($item->first()->empresa_id)->nombre,
                'value' => $remoto
            ];
        })->sortByDesc('value')->take(5)->values()->all();

        $estadisticas_empresas = [
            'practicas' => $practicas,
            'contratos' => $contratos,
            'salarios' => $salarios,
            'remotos' => $remotos
        ];

        return $estadisticas_empresas;
    }
}
