import React, { useContext, useEffect, useState } from "react";
import './SeccionHome.css';
import ColoresContext from "../../contextos/ColoresContext";


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
            <div className={`col-6 mitad ${props.fotoDerecha ? 'order-0' : 'order-1'}`}>
                <h1 className="seccionHomeTitulo" style={{ color: colores[modoColor].Titulos.principal}} >{props.titulo} </h1>
                <p className="seccionHomeTexto" style={{ color: colores[modoColor].Texto.principal}} >{props.texto}</p>
            </div>
            <div className={`col-6 ${props.fotoDerecha ? 'order-1' : 'order-0'}`}>
                <img className="seccionHomeFoto" src={props.foto} alt="Foto sección" />
            </div>
        </div>
    );
}

export default SeccionHome;