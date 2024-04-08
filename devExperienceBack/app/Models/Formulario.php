<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Formulario extends Model
{
    use HasFactory;

    protected $fillable = [
        'remoto',
        'opcion_quedarse',
        'salario_ofrecido',
        'val_empresa',
        'val_formacion',
        'val_ambiente_trabajo',
        'tipo_jornada',
        'hora_entrada',
        'hora_salida',
        'tiempo_descanso',
        'equipo_trabajo',
        'centro_id',
        'empresa_id'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function centro(): BelongsTo
    {
        return $this->belongsTo(Centro::class, 'centro_id');
    }

    public function tecnologias(): BelongsToMany
    {
        return $this->belongsToMany(Tecnologia::class, 'tecnologias_formularios', 'formulario_id', 'tecnologia_id');
    }
}
