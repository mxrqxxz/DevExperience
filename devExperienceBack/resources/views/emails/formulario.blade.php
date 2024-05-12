<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Arial', sans-serif; /* Fuente uniforme y legible */
            background-color: #f4f4f4; /* Color de fondo suave */
            color: #333; /* Color de texto oscuro para mejorar la lectura */
            margin: 0;
            padding: 20px;
        }
        .email-container {
            background: #ffffff; /* Fondo blanco para el contenido */
            border: 1px solid #dddddd; /* Borde sutil */
            padding: 20px;
            margin: 0 auto; /* Centrado */
            max-width: 600px; /* Ancho máximo para la legibilidad */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra sutil para profundidad */
        }
        .email-header {
            color: #007bff; /* Color temático para el encabezado */
            font-size: 24px; /* Tamaño grande para el encabezado */
        }
        .email-body {
            margin-top: 20px; /* Espacio antes del cuerpo del mensaje */
        }
        .email-footer {
            margin-top: 40px; /* Espacio antes del pie de página */
            font-size: 12px; /* Tamaño más pequeño para el texto del pie de página */
            text-align: center; /* Centrado del texto del pie de página */
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1 class="email-header">Nuevo Mensaje de Contacto</h1>
        <div class="email-body">
            <p><strong>Nombre:</strong> {{ $nombre }}</p>
            <p><strong>Mensaje:</strong></p>
            <p>{{ $mensaje }}</p>
        </div>
        <div class="email-footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de nuestro sitio web.</p>
        </div>
    </div>
</body>
</html>
