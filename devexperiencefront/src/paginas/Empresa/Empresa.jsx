import React from "react";
import { useParams } from 'react-router-dom';
import Navbar from '../../componentes/navbar/Navbar.jsx';


function Empresa(props) {

    const { nombre } = useParams();

    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <h1>Empresa { nombre }</h1>
        </div>
    );
}

export default Empresa;