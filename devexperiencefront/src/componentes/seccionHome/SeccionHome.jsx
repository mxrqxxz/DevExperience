import React, { useContext, useEffect, useState } from "react";
import './SeccionHome.css';
import ColoresContext from "../../contextos/ColoresContext";
import BotonEnlace from "../boton-enlace/BotonEnlace";


function SeccionHome(props) {

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
        <div className="row seccion" style={props.fondo === "principal" ? { backgroundColor: colores[modoColor].Fondos.principal } : { backgroundColor: colores[modoColor].Fondos.secundario }}>
            <div className={`col-12 col-md-6 mitad order-0 ${props.fotoDerecha ? 'order-md-0' : 'order-md-1'}`}>
                <h1 className="seccionHomeTitulo" style={{ color: colores[modoColor].Titulos.principal}} >{props.titulo} </h1>
                <p className="seccionHomeTexto" style={{ color: colores[modoColor].Texto.principal}} >{props.texto}</p>
            </div>
            <div className={`col-12 col-md-6 order-1 ${props.fotoDerecha ? 'order-md-1' : 'order-md-0'}`}>
                <img className="seccionHomeFoto" src={props.foto} alt="Foto sección" />
            </div>
            <div className="col-12 order-2">
                {props.boton && (
                <BotonEnlace enlace={props.boton.enlace} contenido={props.boton.contenido} />
                )}
            </div>
        </div>
    );
}

export default SeccionHome;