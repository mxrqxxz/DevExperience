<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\HomeController;


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('datosHome', [HomeController::class, 'index']);

require __DIR__.'/auth.php';
