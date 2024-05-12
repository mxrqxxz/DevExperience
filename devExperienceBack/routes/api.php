<?php

use App\Http\Controllers\API\ComentarioController;
use App\Http\Controllers\API\ComentariosUsuariosController;
use App\Http\Controllers\API\EmpresaController;
use App\Http\Controllers\API\EmpresasController;
use App\Http\Controllers\API\EnviarCorreos;
use App\Http\Controllers\API\EstadisticasController;
use App\Http\Controllers\API\FormularioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\HomeController;
use App\Http\Controllers\API\PerfilController;
use App\Http\Controllers\API\TokenController;
use App\Http\Middleware\ComprobarTipoUsuario;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('v1')->group(function () {

    //Rutas accesibles sin autenticación
    Route::get('datosHome', [HomeController::class, 'index']);
    Route::get('estadisticas', [EstadisticasController::class, 'estadisticas']);
    Route::post('enviarCorreoForm', [EnviarCorreos::class, 'enviarCorreoForm']);

    //Rutas accesibles solo con autenticación
    Route::middleware('auth:sanctum')->group(function () {

        Route::get('perfil', [PerfilController::class, 'datosPerfil']);
        Route::put('editarPerfil', [PerfilController::class, 'actualizarPerfil']);
        Route::post('createComentarioReaccion', [ComentariosUsuariosController::class, 'store']);
        Route::post('createComentario', [ComentarioController::class, 'store']);
        Route::get('empresa/{id}', [EmpresaController::class, 'index']);
        Route::get('empresas', [EmpresasController::class, 'index']);

        //Middleware para comprobar el tipo de usuario(alumno)
        Route::middleware(['auth:sanctum', ComprobarTipoUsuario::class . ':alumno'])->group(function () {
            Route::post('createFormulario', [FormularioController::class, 'store']);
        });

        //Middleware para comprobar el tipo de usuario(profesor)
        Route::middleware(['auth:sanctum', ComprobarTipoUsuario::class . ':profesor'])->group(function () {
            Route::post('createEmpresa', [EmpresaController::class, 'store']);
            Route::post('enviarCorreos', [EnviarCorreos::class, 'enviarCorreos']);
        });

    });

    // registra un nuevo usuario
    Route::post('register', [TokenController::class, 'register']);
    // emite un nuevo token
    Route::post('login', [TokenController::class, 'login']);
    // elimina el token del usuario autenticado
    Route::delete('logout', [TokenController::class, 'destroy'])->middleware('auth:sanctum');
});
