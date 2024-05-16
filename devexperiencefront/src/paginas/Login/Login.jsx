import React, { useState, useEffect } from 'react';

function Login () {

    const [csrfToken, setCsrfToken] = useState('');

    const usuarioInicial = {
        email: 'Sin definir',
        password: 'Sin definir',
        disponible: false
    }

    const [usuario, setUsuario] = useState(usuarioInicial);

    // Al hacer click en login, se asignan los valores del formulario
    const asignarValores = async (event) => {
        event.preventDefault();
        setUsuario({
            email: event.target.email.value,
            password: event.target.password.value,
            disponible: true
        });
    };

    // Al asignar valores del usuario, se envía el formulario y se resetea
    useEffect(() => {
        enviarLogin()
        setUsuario(usuarioInicial);
        vaciarFormulario();
    }, [usuario.disponible === true]);

    // Reseteo del formulario
    function vaciarFormulario() {
        const campoEmail = document.getElementById("email");
        const campoPass = document.getElementById("password");
        campoEmail.value = "";
        campoPass.value = "";
    }

    // Envío del formulario
    const enviarLogin = async () => {
        try {
            await loguear(usuario);
        } catch (error) {
            console.error("Error al enviar el login: ", error);
        }
    };

    /* export async function sendSoporteForm (props) {
        return fetch('http://devexperience.test/api/v1/enviarCorreoForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: props.nombre,
                email: props.email,
                mensaje: props.mensaje
            }),
        })
    } */
    

    async function loguear (usuario) {
        try {
            console.log(csrfToken);
            const response = await fetch('http://devexperience.test/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    email: usuario.email,
                    password: usuario.password
                })
            });
            const data = await response.json();
            if (response.ok) {
                //login(data.token); // Guarda el token usando el contexto
                console.log(data);
            } else {
                throw new Error(data.message || 'Error al hacer login');
            } 
        } catch (error) {
            console.error('Error de Login:', error);
        }
    };

    // Obtener el token CSRF cuando el componente se monta
    useEffect(() => {
        // En tu componente React, al cargar el componente o antes de hacer la solicitud POST
        fetch('http://devexperience.test/api/v1/csrf-token', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                setCsrfToken(data.csrfToken)
            });

    }, []);

    return (
        <form onSubmit={asignarValores}>
            <div>
                <label>Usuario</label>
                <input type="email" id='email' />
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" id='password' />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
