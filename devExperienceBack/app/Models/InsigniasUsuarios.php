<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InsigniasUsuarios extends Model
{
    use HasFactory;

    protected $table = 'insignias_usuarios';

    protected $fillable = [
        'usuario_id',
        'insignia_id',
    ];

    protected $primaryKey =  [
        'usuario_id',
        'insignia_id',
    ];

    public $incrementing = false;
}
