<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tecnologia;
use Illuminate\Http\Request;

class TecnologiaController extends Controller
{

    public function index()
    {
        return Tecnologia::select('id', 'nombre', 'tipo')->get();
    }

    public function getByType($type)
    {
        return Tecnologia::select('id', 'nombre', 'tipo')->where('tipo', $type)->get();
    }
}
