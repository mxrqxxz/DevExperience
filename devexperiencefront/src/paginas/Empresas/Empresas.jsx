import React, { useState, useEffect, useContext } from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import useEmpresas from "../../hooks/useEmpresas.jsx";
import ColoresContext from "../../contextos/ColoresContext.jsx";

function Empresas(props) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || null;
    const { listaEmpresas, isLoading, error } = useEmpresas(token);
    const colores = useContext(ColoresContext);
    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Dark" : "Light";
            setModoColor(newColorMode);
        };
        updateColorMode();
    }, [props.infoGuardada.darkmode]);
    

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || "Error al cargar la lista de empresas"}</div>;
    }

    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <h1>Empresas</h1>
        </div>
    );
}

export default Empresas;