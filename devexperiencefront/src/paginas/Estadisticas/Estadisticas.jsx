import React from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';


function Estadisticas(props) {
    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <h1>Estadisticas generales</h1>
        </div>
    );
}

export default Estadisticas;