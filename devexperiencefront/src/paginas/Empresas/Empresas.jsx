import React, { useState, useEffect, useContext } from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import useEmpresas from "../../hooks/useEmpresas.jsx";
import ColoresContext from "../../contextos/ColoresContext.jsx";
import ListaEmpresas from "../../componentes/listaEmpresas/ListaEmpresas.jsx";
import "./Empresas.css";
import Select from "../../componentes/select/Select.jsx";
import useTecnologiasTipo from "../../hooks/useTecnologiasTipo.jsx";

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

    // Listas de tecnologias para filtros
    const { listaDatos: listaDatosFront } = useTecnologiasTipo("Front-end");
    const { listaDatos: listaDatosBack } = useTecnologiasTipo("Back-end");


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || "Error al cargar la lista de empresas"}</div>;
    }

    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <div className="container-fluid p-0">
                <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.terciario }}>
                    <div className="col-12">
                        <h1 className="tituloSeccion">Empresas</h1>
                    </div>
                    <div className="col-12">
                        <p>Filtrar</p>

                    </div>
                </div>
                <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.terciario }}>
                    <ListaEmpresas lista={listaEmpresas}></ListaEmpresas>
                </div>
            </div>
        </div>
    );
}

export default Empresas;