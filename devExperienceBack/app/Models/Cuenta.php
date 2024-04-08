<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Cuenta extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre'
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'cuentas_usuarios', 'cuenta_id', 'usuario_id')->withPivot('url');
    }
}
