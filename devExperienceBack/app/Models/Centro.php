<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Centro extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'direccion',
        'imagen',
    ];

    public function formularios(): HasMany
    {
        return $this->hasMany(Formulario::class);
    }
}
