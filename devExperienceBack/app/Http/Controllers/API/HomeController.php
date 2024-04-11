<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comentario;
use App\Models\Empresa;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {

        return response()->json(
            [
                'empresas' => Empresa::count(),
                'users' => User::count(),
                'comentarios' => Comentario::count()
            ]
        );
    }
}
