<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TecnologiasFormularios extends Model
{
    use HasFactory;

    protected $fillable = [
        'tecnologia_id',
        'formulario_id'
    ];

    protected $table = 'tecnologias_formularios';

    protected $primaryKey =  [
        'tecnologia_id',
        'formulario_id'
    ];

    public $incrementing = false;
}
