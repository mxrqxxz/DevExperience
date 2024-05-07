import React from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';

function Soporte(props) {
    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <h1>Soporte</h1>
        </div>
    );
}

export default Soporte;