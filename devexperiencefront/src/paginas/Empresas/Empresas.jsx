import React from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';

function Empresas(props) {
    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <h1>Empresas</h1>
        </div>
    );
}

export default Empresas;