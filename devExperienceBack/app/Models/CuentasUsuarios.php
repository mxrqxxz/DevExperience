<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CuentasUsuarios extends Model
{
    use HasFactory;

    protected $table = 'cuentas_usuarios';

    protected $fillable = [
        'cuenta_id',
        'usuario_id',
        'url'
    ];

    protected $primaryKey =  [
        'cuenta_id',
        'usuario_id',
    ];

    public $incrementing = false;

}
