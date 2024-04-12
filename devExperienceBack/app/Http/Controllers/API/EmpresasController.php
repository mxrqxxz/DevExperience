<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Formulario;
use App\Models\TecnologiasFormularios;
use App\Models\Empresa;
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
        $empresa = [
            'nombre' => '',
            'modalidad' => ''
        ];
    }

}
