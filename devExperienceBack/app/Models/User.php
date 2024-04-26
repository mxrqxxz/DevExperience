<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'usuario',
        'email',
        'email_verified_at',
        'nombre',
        'apellidos',
        'sobre_mi',
        'avatar',
        'practicas_realizadas',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function formulario(): HasOne
    {
        return $this->hasOne(Formulario::class);
    }

    public function comentarios(): HasMany
    {
        return $this->hasMany(Comentario::class);
    }

    public function insignias(): BelongsToMany
    {
        return $this->belongsToMany(Insignia::class, 'insignias_usuarios', 'usuario_id', 'insignia_id');
    }

    public function cuentas(): BelongsToMany
    {
        return $this->belongsToMany(Cuenta::class, 'cuentas_usuarios', 'usuario_id', 'cuenta_id')->withPivot('url');
    }

    public function comentariosLista(): BelongsToMany
    {
        return $this->belongsToMany(Comentario::class, 'comentarios_usuarios', 'usuario_id', 'comentario_id')->withPivot('reaccion');
    }


}
