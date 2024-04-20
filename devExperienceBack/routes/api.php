<?php

use App\Http\Controllers\API\ComentarioController;
use App\Http\Controllers\API\ComentariosUsuariosController;
use App\Http\Controllers\API\EmpresaController;
use App\Http\Controllers\API\EmpresasController;
use App\Http\Controllers\API\EstadisticasController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\HomeController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('v1')->group(function () {
    Route::get('datosHome', [HomeController::class, 'index']);
    Route::get('empresas', [EmpresasController::class, 'index']);
    Route::get('empresa/{id}', [EmpresaController::class, 'index']);
    Route::get('estadisticas', [EstadisticasController::class, 'estadisticas']);
    Route::post('createEmpresa', [EmpresaController::class, 'store']);
    Route::post('createComentario', [ComentarioController::class, 'store']);
    Route::post('createComentarioReaccion', [ComentariosUsuariosController::class, 'store']);
});
