<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tecnologia extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'tipo',
        'logo'
    ];

    public function formularios(): BelongsToMany
    {
        return $this->belongsToMany(Formulario::class, 'tecnologias_formularios', 'tecnologia_id', 'formulario_id');
    }
}
