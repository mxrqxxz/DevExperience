<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Centro;
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
            'estadisticas_centros' => $this->centros(),
            'estadisticas_horarios' => $this->horarios()
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
        $tecnologiasFiltradas = $array->filter(function ($tecnologia) use ($tipo) {
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
        $empresas = Empresa::all();

        $practicas = $formularios->groupBy('empresa_id')->map(function ($item) use ($empresas) {
            $empresa = $empresas->find($item->first()->empresa_id);
            return [
                'name' => $empresa->nombre,
                'value' => $item->count(),
                'icon' => $empresa->imagen
            ];
        })->sortByDesc('value')->take(5)->values()->all();

        $contratos = $formularios->groupBy('empresa_id')->map(function ($item) use ($empresas) {
            $numeroContratos = $item->where('opcion_quedarse', 1)->count();
            $empresa = $empresas->find($item->first()->empresa_id);
            return [
                'name' => $empresa->nombre,
                'value' => $numeroContratos,
                'icon' => $empresa->imagen
            ];
        })->sortByDesc('value')->take(5)->values()->all();

        $salarios = $formularios->groupBy('empresa_id')->map(function ($item) use ($empresas) {
            $salario = $item->where('salario_ofrecido', '>', 0)->avg('salario_ofrecido');
            $empresa = $empresas->find($item->first()->empresa_id);
            return [
                'name' => $empresa->nombre,
                'value' => floor($salario),
                'icon' => $empresa->imagen
            ];
        })->sortByDesc('value')->take(5)->values()->all();

        $remotos = $formularios->groupBy('empresa_id')->map(function ($item) use ($empresas) {
            $remoto = $item->where('remoto', 1)->count();
            $empresa = $empresas->find($item->first()->empresa_id);
            return [
                'name' => $empresa->nombre,
                'value' => $remoto,
                'icon' => $empresa->imagen
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

    public function centros()
    {
        $formularios = Formulario::all();
        $centros = Centro::all();

        $contratos = $formularios->groupBy('centro_id')->map(function ($item) use ($centros) {
            $numeroContratos = $item->where('opcion_quedarse', 1)->count();
            $centro = $centros->find($item->first()->centro_id);
            return [
                'name' => $centro->nombre,
                'value' => $numeroContratos,
                'icon' => $centro->imagen
            ];
        })->sortByDesc('value')->take(5)->values()->all();

        $salarios = $formularios->groupBy('centro_id')->map(function ($item) use ($centros) {
            $salario = $item->where('salario_ofrecido', '>', 0)->avg('salario_ofrecido');
            $centro = $centros->find($item->first()->centro_id);
            return [
                'name' => $centro->nombre,
                'value' => floor($salario),
                'icon' => $centro->imagen
            ];
        })->sortByDesc('value')->take(5)->values()->all();

        $remotos = $formularios->groupBy('centro_id')->map(function ($item) use ($centros) {
            $remoto = $item->where('remoto', 1)->count();
            $centro = $centros->find($item->first()->centro_id);
            return [
                'name' => $centro->nombre,
                'value' => $remoto,
                'icon' => $centro->imagen
            ];
        })->sortByDesc('value')->take(5)->values()->all();

        $empresasAsociadas = $formularios->groupBy('centro_id')->map(function ($item) use ($centros) {
            $uniqueEmpresas = $item->pluck('empresa_id')->unique()->count();
            $centro = $centros->find($item->first()->centro_id);
            return [
                'name' => $centro->nombre,
                'value' => $uniqueEmpresas,
                'icon' => $centro->imagen
            ];
        })->sortByDesc('value')->take(5)->values()->all();

        $estadisticas_centros = [
            'contratos' => $contratos,
            'salarios' => $salarios,
            'remotos' => $remotos,
            'empresasAsociadas' => $empresasAsociadas
        ];
        return $estadisticas_centros;
    }
    public function horarios()
    {
        $formularios = Formulario::all();

        $hora_entrada = $formularios->groupBy('hora_entrada')->map(function ($item, $key) {
            return ['name' => $key, 'value' => $item->count()];
        })->sortByDesc('value')->take(5)->values()->all();

        $hora_salida = $formularios->groupBy('hora_salida')->map(function ($item, $key) {
            return ['name' => $key, 'value' => $item->count()];
        })->sortByDesc('value')->take(5)->values()->all();

        $jornada_tipo = $formularios->groupBy('tipo_jornada')->map(function ($item, $key) {
            return ['name' => $key, 'value' => $item->count()];
        })->sortByDesc('value')->take(5)->values()->all();

        $tiempo_descanso = $formularios->groupBy('tiempo_descanso')->map(function ($item, $key) {
            return ['name' => $key, 'value' => $item->count()];
        })->sortByDesc('value')->take(5)->values()->all();

        $estadisticas_horarios = [
            'hora_entrada' => $hora_entrada,
            'hora_salida' => $hora_salida,
            'jornada_tipo' => $jornada_tipo,
            'tiempo_descanso' => $tiempo_descanso

        ];
        return $estadisticas_horarios;
    }
}
