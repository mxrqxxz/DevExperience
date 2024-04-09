<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
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
        User::factory(10)->create();
        $this->call(CentrosTableSeeder::class);
        $this->call(EmpresasTableSeeder::class);
        $this->call(InsigniasTableSeeder::class);
        $this->call(CuentasTableSeeder::class);
        $this->call(TecnologiasTableSeeder::class);
        Schema::enableForeignKeyConstraints();
        $this->command->info('Tablas inicializadas con datos!');
    }
}
