import React from "react";
import "./Select.css";

function Select(props) {

    function mostrarOpciones(params) {
        return <option value={params.nombre}>{params.nombre}</option>;
    }

    return (
        <select className="selectEmpresas" name={props.nombre} id={props.id}>
            <option value="Sin definir">{props.placeholder}</option>
            {props.opciones.map(mostrarOpciones)}
        </select>
    );
}

export default Select;