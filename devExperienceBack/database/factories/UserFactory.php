<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $nombre = fake()->firstName();
        $rol = rand(0, 1);
        $correo = $rol == 0 ? $nombre . '@alu.murciaeduca.es' : $nombre . '@murciaeduca.es';

        return [

            'nombre' => $nombre,
            'apellidos' => fake()->lastName(),
            'sobre_mi' => fake()->sentence(),
            'avatar' => 'https://img.freepik.com/vector-premium/ilustracion-avatar-estudiante-cono-perfil-usuario-avatar-jovenes_118339-4402.jpg',
            'practicas_realizadas' => fake()->boolean(),
            'usuario' => fake()->userName(),
            'email' => $correo,
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
