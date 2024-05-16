import React, { useContext, useEffect, useState } from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import Boton from "../../componentes/boton/Boton.jsx";
import fotoSoporte from '../../assets/imgs/soporte.png';
import './Soporte.css';
import ColoresContext from "../../contextos/ColoresContext";
import { sendSoporteForm } from "../../servicios/sendSoporteForm.jsx";


function Soporte(props) {

    const colores = useContext(ColoresContext);

    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Dark" : "Light";
            setModoColor(newColorMode);
            console.log('cambio de color');
        };

        updateColorMode();
    }, [props.infoGuardada.darkmode]);

    // LOGICA FORMULARIO

    const formularioInicial = {
        nombre: "Sin definir",
        email: "Sin definir",
        mensaje: "Sin definir",
        disponible: false
    }

    const [formulario, setFormulario] = useState(formularioInicial);


    // Al hacer click en enviar, se asignan los valores del formulario
    const asignarValores = async (event) => {
        event.preventDefault();

        setFormulario({
            nombre: event.target.nombre.value,
            email: event.target.email.value,
            mensaje: event.target.mensaje.value,
            disponible: true
        });
    };

    // Al asignar valores del formulario, se envía el formulario y se resetea
    useEffect(() => {
        enviarSoporteForm()
        setFormulario(formularioInicial);
        vaciarFormulario();
    }, [formulario.disponible === true]);

    // Reseteo del formulario
    function vaciarFormulario() {
        const campoNombre = document.getElementById("nombre");
        const campoEmail = document.getElementById("email");
        const campoMensaje = document.getElementById("mensaje");
        campoNombre.value = "";
        campoEmail.value = "";
        campoMensaje.value = "";
    }

    // Envío del formulario
    const enviarSoporteForm = async () => {
        try {
            await sendSoporteForm(formulario);
        } catch (error) {
            console.error("Error al enviar el formulario: ", error);
        }
    };

    return (
        <>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <div className="container-fluid p-0">
                <div className="row contenido" style={{ backgroundColor: colores[modoColor].Fondos.secundario }}>
                    <div className="col-12 col-md-6">
                        <div className="mitad text-center">
                            <img src={fotoSoporte} className="centrado fotoSoporte" alt="Foto asistente técnico" />
                            <p style={{ color: colores[modoColor].Texto.principal }} className="centrado" >¡Hola! Para ponerte en contacto con nosotros, rellena este formulario o mándanos un email a admin@devexperience.com.</p>
                            <br />
                            <p style={{ color: colores[modoColor].Texto.principal }} className="centrado" >Te responderemos en la mayor brevedad posible. &#128515;</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="formularioSoporte mitad">
                            <form onSubmit={asignarValores} method="post" encType="text/plain">
                                <input type="text" id="nombre" name="nombre" required placeholder="Nombre" />
                                <input type="email" id="email" name="email" required placeholder="Email" />
                                <textarea id="mensaje" name="mensaje" rows={10} required placeholder="Deja tu mensaje"></textarea>
                                <div className="divBoton">
                                    <Boton type="submit" contenido="Enviar" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12" style={{ backgroundColor: colores[modoColor].Fondos.footer }}>
                        <p style={{ color: colores[modoColor].Texto.principal }} className="pFooter" >&#169; DevExperience | Diseñado por: Manuel Fernández y Jesús Rial | Proyecto TFG DAW 2024</p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Soporte;