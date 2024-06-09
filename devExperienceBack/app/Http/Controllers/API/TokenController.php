<?php
// in app/Http/Controllers/API/TokenController.php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;

class TokenController extends Controller
{
    /**
     * Store a newly created personal access token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    //falta el registro de usuario
    public function register(Request $request)
    {
        //validacion de datos y si no se cumple se devuelve un mensaje de error
        $validator = validator()->make($request->all(), [
            'usuario' => 'required|string',
            'nombre' => 'required|string',
            'apellidos' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string',
            'confirm_password' => 'required|string|same:password',
        ]);
        if ($validator->fails()) {
            // Construye un mensaje de error claro para cada campo que falló la validación
            $errors = $validator->errors();
            $errorMessages = [];

            foreach ($errors->getMessages() as $field => $message) {
                $errorMessages[] = "{$field}: " . implode(", ", $message);
            }

            return response()->json([
                'message' => 'Validation failed: ' . implode("; ", $errorMessages)
            ], 422);
        }
        //quiero comprobar que el email tenga despues del @ un dominio de correo en concreto
        $email = $request->email;
        $dominio = substr($email, strpos($email, '@') + 1);

        if ($dominio != 'murciaeduca.es' && $dominio != 'alu.murciaeduca.es') {
            return response()->json([
                'message' => 'El Email debe pertenecer a un dominio de correo de murciaeduca'
            ], 409);
        } else if (User::where('usuario', $request->usuario)->exists()) {
            return response()->json([
                'message' => 'El Usuario ya existe'
            ], 409);
        } else if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'El Email ya existe'
            ], 409);
        }

        //creamos el usuario
        $user = User::create(
            [
                'usuario' => $request->usuario,
                'nombre' => $request->nombre,
                'apellidos' => $request->apellidos,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'formulario_realizado' => '0'
            ]

        );
        return response()->json([
            'token_type' => 'Bearer',
            'access_token' => $user->createToken('token_name')->plainTextToken
        ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $user = User::where('email', $request->email)->first();
        // Extraer el dominio del correo electrónico
        $email = $user->email;
        $domain = substr(strrchr($email, "@"), 1);

        // Determinar el rol basado en el dominio
        if (strpos($domain, 'alu.murciaeduca') !== false) {
            $role = 'alumno';
        } elseif (strpos($domain, 'murciaeduca') !== false) {
            $role = 'profesor';
        } else {
            $role = 'desconocido'; // O cualquier otro rol predeterminado
        }
        return response()->json([
            'token_type' => 'Bearer',
            'access_token' => $user->createToken('token_name')->plainTextToken,
            'user_image' => $user->avatar,
            'rol' => $role
        ]);
    }

    /**
     * Delete the user's personal access token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Token deleted'
        ]);
    }

    public function getCsrfToken()
    {
        return response()->json([
            'csrf_token' => csrf_token()
        ]);
    }
    public function checkToken()
    {
        return response()->json([
            'valido' => true
        ]);
    }
}
