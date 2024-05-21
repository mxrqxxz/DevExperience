<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Formulario;
use App\Models\TecnologiasFormularios;
use App\Models\Empresa;
use App\Models\Tecnologia;
use Illuminate\Http\Request;

class EmpresasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $formularios = Formulario::all();
        $tecnologiasFormularios = TecnologiasFormularios::all();
        //necesitamos obtener los id de las empresas en formularios y recoger los datos de las empresas en la tabla empresas pero sin repetir
        $empresas = Empresa::whereIn('id', $formularios->pluck('empresa_id'))->get();
        //necesitamos crear un array por cada empresa que muestre el campo modalidad que está en el formulario
        $output = [];

        foreach ($empresas as $empresa) {

            $formulariosEmpresa = $formularios->where('empresa_id', $empresa->id);

            // metemos en un array los campos distintos remoto
            $remotos = $formulariosEmpresa->pluck('remoto')->unique();

            // metemos en un array los campos distintos tecnologias
            $tecnologias = $tecnologiasFormularios->whereIn('formulario_id', $formulariosEmpresa->pluck('id'))->pluck('tecnologia_id')->unique();

            $empresa = [
                'id' => $empresa->id,
                'nombre' => $empresa->nombre,
                'remoto' => $this->traducirRemoto($remotos),
                'tecnologiasFront' => $this->filtrarTecnologias($tecnologias, 'Front-end'),
                'tecnologiasBack' => $this->filtrarTecnologias($tecnologias, 'Back-end'),
                'notaMedia' => $formulariosEmpresa->where('empresa_id', $empresa->id)->avg('val_empresa'),
                'imagen' => $empresa->imagen,
            ];

            array_push($output, $empresa);
        }

        return response()->json($output);
    }

    private function filtrarTecnologias($tecnologias, String $tipo)
    {
        $tecnologiasFiltradas = [];

        foreach ($tecnologias as $tecnologia) {
            $tecnologia = Tecnologia::find($tecnologia);
            if ($tecnologia->tipo == $tipo) {
                array_push($tecnologiasFiltradas, $tecnologia->nombre);
            }
        }

        return $tecnologiasFiltradas;
    }

    private function traducirRemoto($remotos)
    {
        $modalidadPresencial = false;
        $modalidadRemoto = false;
        foreach ($remotos as $remoto) {
            if ($remoto == 1) {
                $modalidadRemoto = true;
            } else {
                $modalidadPresencial = true;
            }
        }

        if ($modalidadRemoto && $modalidadPresencial) {
            $remotos = 'Presencial y remoto';
        } else if ($modalidadRemoto) {
            $remotos = 'Remoto';
        } else {
            $remotos = 'Presencial';
        }

        return $remotos;
    }
}
