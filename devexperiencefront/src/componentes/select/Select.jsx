import React from "react";
import "./Select.css";

function Select(props) {

    function mostrarOpciones(params) {
        return <option className="option" key={params.nombre} value={params.nombre}>{params.nombre}</option>;
    }

    function devolverValor(event) {
        props.gestion(event.target.value);
    }

    return (
        <select onChange={devolverValor} style={{ color: props.color }} className="selectEmpresas" name={props.nombre} id={props.id}>
            <option key={0} value="Sin definir">{props.placeholder}</option>
            {props.opciones.map(mostrarOpciones)}
        </select>
    );
}

export default Select;