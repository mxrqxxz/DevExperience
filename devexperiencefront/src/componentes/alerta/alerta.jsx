import React from "react";
import './alerta.css';

function Alerta(props) {
    return (
        <>
            <div className="overlay"></div>
            <div className="formularioEnviado" style={{ backgroundColor: props.colorFondo }}>
                <p className="pMensaje" style={{ color: props.colorTexto }}>
                    {props.mensaje}
                </p>
            </div>
        </>
    )
}

export default Alerta;