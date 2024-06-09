<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CreateDatabaseTriggers extends Command
{
    protected $signature = 'db:create-triggers';
    protected $description = 'Create database triggers';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Crear trigger para comentarios_usuarios
        DB::unprepared('
            CREATE TRIGGER `INSIGNIA_COMENTARIOS` AFTER INSERT ON `comentarios`
            FOR EACH ROW
            BEGIN
                DECLARE comentario_count INT;

                -- Contar los comentarios del usuario
                SELECT COUNT(*) INTO comentario_count
                FROM comentarios
                WHERE usuario_id = NEW.usuario_id;

                -- Verificar si el usuario tiene 4 o más comentarios
                IF comentario_count = 4 THEN
                    -- Insertar o actualizar en insignias_usuarios
                    INSERT INTO insignias_usuarios (usuario_id, insignia_id, created_at, updated_at)
                    VALUES (NEW.usuario_id, 1, NOW(), NOW())
                    ON DUPLICATE KEY UPDATE insignia_id = 3, updated_at = NOW();
                END IF;

                -- Verificar si el usuario tiene 10 o más comentarios
                IF comentario_count = 10 THEN
                    -- Insertar o actualizar en insignias_usuarios
                    INSERT INTO insignias_usuarios (usuario_id, insignia_id, created_at, updated_at)
                    VALUES (NEW.usuario_id, 3, NOW(), NOW())
                    ON DUPLICATE KEY UPDATE insignia_id = 5, updated_at = NOW();
                END IF;
            END
        ');

        // Crear trigger para formularios
        DB::unprepared('
            CREATE TRIGGER `INSIGNIA_FORMULARIO` AFTER INSERT ON `formularios`
            FOR EACH ROW
            BEGIN
                INSERT INTO insignias_usuarios (usuario_id, insignia_id, created_at, updated_at)
                VALUES (NEW.usuario_id, 2, NOW(), NOW());
            END
        ');

        DB::unprepared('
        CREATE EVENT IF NOT EXISTS `asignar_nuevo_usuario`
        ON SCHEDULE EVERY 1 DAY
        DO
        BEGIN
            INSERT INTO insignias_usuarios (usuario_id, insignia_id, created_at, updated_at)
            SELECT id, 4, NOW(), NOW()
            FROM users
            WHERE created_at >= NOW() - INTERVAL 1 DAY
            ON DUPLICATE KEY UPDATE insignia_id = 4, updated_at = NOW();
        END;
    ');

        DB::unprepared('
        CREATE EVENT IF NOT EXISTS `asignar_usuario_1_mes`
        ON SCHEDULE EVERY 1 DAY
        DO
        BEGIN
            INSERT INTO insignias_usuarios (usuario_id, insignia_id, created_at, updated_at)
            SELECT id, 5, NOW(), NOW()
            FROM users
            WHERE created_at < NOW() - INTERVAL 1 MONTH AND created_at >= NOW() - INTERVAL 1 MONTH - INTERVAL 1 DAY
            ON DUPLICATE KEY UPDATE insignia_id = 5, updated_at = NOW();
        END;
    ');

        DB::unprepared('
        CREATE EVENT IF NOT EXISTS `asignar_usuario_6_meses`
        ON SCHEDULE EVERY 1 DAY
        DO
        BEGIN
            INSERT INTO insignias_usuarios (usuario_id, insignia_id, created_at, updated_at)
            SELECT id, 6, NOW(), NOW()
            FROM users
            WHERE created_at < NOW() - INTERVAL 6 MONTH AND created_at >= NOW() - INTERVAL 6 MONTH - INTERVAL 1 DAY
            ON DUPLICATE KEY UPDATE insignia_id = 6, updated_at = NOW();
        END;
    ');

        DB::unprepared('
        CREATE EVENT IF NOT EXISTS `asignar_usuario_1_ano`
        ON SCHEDULE EVERY 1 DAY
        DO
        BEGIN
            INSERT INTO insignias_usuarios (usuario_id, insignia_id, created_at, updated_at)
            SELECT id, 7, NOW(), NOW()
            FROM users
            WHERE created_at < NOW() - INTERVAL 1 YEAR AND created_at >= NOW() - INTERVAL 1 YEAR - INTERVAL 1 DAY
            ON DUPLICATE KEY UPDATE insignia_id = 7, updated_at = NOW();
        END;
    ');

        // Crear trigger para actualizar formulario_realizado
        DB::unprepared('
     CREATE TRIGGER `FORMULARIO_REALIZADO` AFTER INSERT ON `formularios`
     FOR EACH ROW
     BEGIN
         UPDATE users
         SET formulario_realizado = 1
         WHERE id = NEW.usuario_id;
     END;
 ');


        $this->info('Database triggers created successfully.');
    }
}
