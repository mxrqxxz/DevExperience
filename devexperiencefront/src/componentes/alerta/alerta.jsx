import React, { useEffect } from "react";
import './alerta.css';

function Alerta({ mensaje, tipo}) {
    return (

        <div className={`alerta show ${tipo}`}>
            <p className="pMensaje">
                {mensaje}
            </p>
        </div>
    );
}

export default Alerta;
