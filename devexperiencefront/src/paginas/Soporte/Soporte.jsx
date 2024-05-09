import React, {useContext, useEffect, useState} from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import Boton from "../../componentes/boton/Boton.jsx";
import fotoSoporte from '../../assets/imgs/soporte.png';
import './Soporte.css';
import ColoresContext from "../../contextos/ColoresContext";


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

    return (
        <div style={{ backgroundColor: colores[modoColor].Fondos.secundario}}>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <div className="row text-center pantalla">
                <div className="col-12 col-md-6 mitad">
                    <img src={fotoSoporte} className="centrado fotoSoporte" alt="Foto asistente técnico" />
                    <p style={{ color: colores[modoColor].Texto.principal}} className="centrado" >¡Hola! Para ponerte en contacto con nosotros, rellena este formulario o mándanos un email a admin@devexperience.com.</p>
                    <p style={{ color: colores[modoColor].Texto.principal}} className="centrado" >Te responderemos en la mayor brevedad posible. &#128515;</p>
                </div>
                <div className="col-12 col-md-6 mitad">
                    <div className="formularioSoporte">
                        <form action="mailto:devexperiencecarlosiii@gmail.com" method="post" enctype="text/plain">
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
                <div className="col-12 text-center footer" style={{ backgroundColor: colores[modoColor].Fondos.footer}}>
                    <p style={{ color: colores[modoColor].Texto.principal}} className="pFooter" >&#169; DevExperience | Diseñado por: Manuel Fernández y Jesús Rial | Proyecto TFG DAW 2024</p>
                </div>
            </div>
        </div>
    );
}

export default Soporte;