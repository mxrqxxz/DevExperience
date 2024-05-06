import React from "react";
import { useParams } from 'react-router-dom';
import { Navbar } from '../../componentes/navbar/Navbar';


function Empresa() {

    const { nombre } = useParams();

    return (
        <div>
            <Navbar></Navbar>
            <h1>Empresa { nombre }</h1>
        </div>
    );
}

export default Empresa;