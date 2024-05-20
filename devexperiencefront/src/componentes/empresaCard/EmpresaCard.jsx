import React from "react";
import "./EmpresaCard.css";
import BotonEnlace from "../boton-enlace/BotonEnlace";

function EmpresaCard(props) {
    return (
        <div className="col-12 col-md-4">
            <div className="cardEmpresa">
                <h3 className="tituloCard colorAzul">{props.empresa.nombre}</h3>
                <p>Front-end</p>
                <p>Back-end</p>
                <p>Modalidad</p>
                <BotonEnlace contenido="Saber más..." enlace=""></BotonEnlace>
            </div>
        </div>
    );
}

export default EmpresaCard;