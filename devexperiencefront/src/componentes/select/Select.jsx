import React from "react";

function Select(props) {

    function mostrarOpciones(params) {
        return <option value={params.value}>{params.text}</option>;
    }

    return (
        <select name={props.nombre} id={props.id}>
            {props.opciones.map(mostrarOpciones)}
        </select>
    );
}

export default Select;