import React from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';


function Perfil(props) {
    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <h1>Perfil</h1>
        </div>
    );
}

export default Perfil;