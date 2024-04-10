<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComentariosUsuarios extends Model
{
    use HasFactory;

    protected $table = 'comentarios_usuarios';

    protected $fillable = [
        'usuario_id',
        'comentario_id',
        'reaccion'
    ];

    protected $primaryKey =  [
        'usuario_id',
        'comentario_id',
    ];

    public $incrementing = false;
}
