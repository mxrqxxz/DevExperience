<?php

use App\Http\Controllers\API\EmpresaController;
use App\Http\Controllers\API\EmpresasController;
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
});
