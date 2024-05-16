import React, { useState, useEffect } from 'react';
import { sendLoginDetails } from '../../servicios/sendLoginDetails';

function Login (props) {

    const loginDetailsInitial = {
        email: 'Sin definir',
        password: 'Sin definir',
        disponible: false
    }

    const [loginDetails, setloginDetails] = useState(loginDetailsInitial);

    // Al hacer click en login, se asignan los valores del formulario
    const asignarValores = async (event) => {
        event.preventDefault();
        setloginDetails({
            email: event.target.email.value,
            password: event.target.password.value,
            disponible: true
        });
    };

    // Al asignar valores del loginDetails, se envía el formulario y se resetea
    useEffect(() => {
        enviarLogin();
        setloginDetails(loginDetailsInitial);
        vaciarFormulario();
    }, [loginDetails.disponible === true]);

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
            await sendLoginDetails(loginDetails).then((token) => {
                const newUser = {
                    token: token,
                    foto: "Sin definir"
                }
                pasarDatosApp(newUser);
            });
        } catch (error) {
            console.error("Error al enviar el login: ", error);
        }
    };

    function pasarDatosApp(newUser) {
        props.cambiarUsuario(newUser);
    }

    return (
        <form onSubmit={asignarValores}>
            <div>
                <label>loginDetails</label>
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
