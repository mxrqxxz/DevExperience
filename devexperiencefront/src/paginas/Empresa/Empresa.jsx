import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from '../../componentes/navbar/Navbar.jsx';
import useEmpresa from "../../hooks/useEmpresa.jsx";


function Empresa(props) {

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || null;

    const { idEmpresa } = useParams();

    const { listaDatos } = useEmpresa(token, idEmpresa);

    console.log(listaDatos);

    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <h1>Empresa { idEmpresa }</h1>
        </div>
    );
}

export default Empresa;