import React from "react";
import { Link } from "react-router-dom";
import './BotonEnlace.css';

function BotonEnlace(props) {
    return (
        <button className="botonEnlace">
            <Link to={props.enlace} className="enlaceBoton">
                {props.contenido}
            </Link>
        </button>
    );
}

export default BotonEnlace;