<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comentario;
use App\Models\Empresa;
use App\Models\Tecnologia;
use App\Models\TecnologiasFormularios;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $tecnologiasFormularios = TecnologiasFormularios::all();
        $totalUsuarios = User::count();

        //Calculamos el porcentaje de uso de cada tecnología
        $porcentajeTecnologias = $tecnologiasFormularios->groupBy('tecnologia_id')->map(function ($item) use ($totalUsuarios) {
            return $item->count() / $totalUsuarios * 100;
        });

        //Obtenemos el nombre de las tecnologías ya que solo tenemos el id
        $tecnologias = Tecnologia::findMany($porcentajeTecnologias->keys())->pluck('nombre', 'id');

        //Creamos un array asociativo con el nombre de la tecnología y su porcentaje de uso para poder mostrarlo en la vista
        $porcentajeTecnologiasNombre = $porcentajeTecnologias->mapWithKeys(function ($porcentaje, $tecnologia_id) use ($tecnologias) {
            return [$tecnologias[$tecnologia_id] => $porcentaje];
        });
        //Ordenamos el array por el porcentaje de uso de mayor a menor y mostramos solo las 10 primeras
        $porcentajeTecnologiasNombre = $porcentajeTecnologiasNombre->sortDesc()->take(10);

        return response()->json(
            [
                'porcentajeTecnologias' => $porcentajeTecnologiasNombre,
                'datosTotales' => [
                    'empresas' => Empresa::count(),
                    'usuarios' => User::count(),
                    'comentarios' => Comentario::count(),
                    ]

            ]
        );
    }
}
