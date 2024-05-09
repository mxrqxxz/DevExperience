import React from "react";
import './Boton.css';

function Boton(props) {
    return (
        <button type={props.type} className="boton">
            {props.contenido}
        </button>
    );
}

export default Boton;