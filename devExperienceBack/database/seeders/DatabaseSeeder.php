<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        User::factory(25)->create();
        User::create([
            'usuario' => 'admin',
            'email' => 'admin',
            'password' => 'admin',
            'nombre' => 'admin',
            'apellidos' => 'admin',
            'sobre_mi' => 'admin',
            'avatar' => 'admin',
            'practicas_realizadas' => '0',
        ]);

        $this->call(CentrosTableSeeder::class);
        $this->command->info('Tabla de centros inicializada con datos');
        $this->call(EmpresasTableSeeder::class);
        $this->command->info('Tabla de empresas inicializada con datos');
        $this->call(InsigniasTableSeeder::class);
        $this->command->info('Tabla de insignias inicializada con datos');
        $this->call(CuentasTableSeeder::class);
        $this->command->info('Tabla de cuentas inicializada con datos');
        $this->call(TecnologiasTableSeeder::class);
        $this->command->info('Tabla de tecnologias inicializada con datos');
        $this->call(ComentariosTableSeeder::class);
        $this->command->info('Tabla de comentarios inicializada con datos');
        $this->call(FormulariosTableSeeder::class);
        $this->command->info('Tabla de formularios inicializada con datos');
        $this->call(TecnologiasFormulariosTableSeeder::class);
        $this->command->info('Tabla de tecnologias_formularios inicializada con datos');
        $this->call(CuentasUsuariosTableSeeder::class);
        $this->command->info('Tabla de cuentas_usuarios inicializada con datos');
        $this->call(ComentariosUsuariosTableSeeder::class);
        $this->command->info('Tabla de comentarios_usuarios inicializada con datos');
        $this->call(InsigniasUsuariosTableSeeder::class);
        $this->command->info('Tabla de insignias_usuarios inicializada con datos');
        Schema::enableForeignKeyConstraints();
        $this->command->info('');
        $this->command->info('*****************************************************');
        $this->command->info('');
        $this->command->info('Todas las tablas han sido inicializadas');
        Artisan::call('db:create-triggers');
        $this->command->info('DISPARADORES Y EVENTOS CREADOS CORRECTAMENTE');
    }
}
