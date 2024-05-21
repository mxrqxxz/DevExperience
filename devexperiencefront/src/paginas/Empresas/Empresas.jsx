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
    const modalidad = [
        {
            id: 1,
            nombre: "Presencial"
        },
        {
            id: 2,
            nombre: "Remoto"
        },
        {
            id: 3,
            nombre: "Presencial y remoto"
        }
    ];

    const valoraciones = [
        {
            id: 1,
            nombre: "1"
        },
        {
            id: 2,
            nombre: "2"
        },
        {
            id: 3,
            nombre: "3"
        },
        {
            id: 4,
            nombre: "4"
        },
        {
            id: 5,
            nombre: "5"
        },
        {
            id: 6,
            nombre: "6"
        },
        {
            id: 7,
            nombre: "7"
        },
        {
            id: 8,
            nombre: "8"
        },
        {
            id: 9,
            nombre: "9"
        },
        {
            id: 10,
            nombre: "10"
        }
    ];


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
                <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.secundario }}>
                    <div className="col-12">
                        <h1 className="tituloSeccion centrarMovil">Empresas</h1>
                    </div>
                    <div className="col-12">
                        <div className="centrar">
                            <p style={{ color: colores[modoColor].Texto.principal }} className="d-md-inline tituloFiltro"><strong>FILTRAR</strong></p>
                            <Select color={colores[modoColor].Texto.principal} nombre="front" id="front" placeholder="Front-end" opciones={listaDatosFront} />
                            <Select color={colores[modoColor].Texto.principal} nombre="back" id="back" placeholder="Back-end" opciones={listaDatosBack} />
                            <Select color={colores[modoColor].Texto.principal} nombre="modalidad" id="modalidad" placeholder="Modalidad" opciones={modalidad} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="centrar2">
                            <p style={{ color: colores[modoColor].Texto.principal }} className="d-md-inline tituloFiltro"><strong>ORDENAR</strong></p>
                            <Select color={colores[modoColor].Texto.principal} nombre="ordenar" id="ordenar" placeholder="Valoración" opciones={valoraciones} />
                        </div>
                    </div>
                </div>
                <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.secundario }}>
                    <ListaEmpresas infoGuardada={props.infoGuardada} lista={listaEmpresas}></ListaEmpresas>
                </div>
            </div>
        </div>
    );
}

export default Empresas;