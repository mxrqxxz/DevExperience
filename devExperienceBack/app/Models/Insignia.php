<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Insignia extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'avatar'
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'insignias_usuarios', 'insignia_id', 'usuario_id');
    }
}
