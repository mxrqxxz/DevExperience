import React, { useState, useEffect, useContext } from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import useEmpresas from "../../hooks/useEmpresas.jsx";
import ColoresContext from "../../contextos/ColoresContext.jsx";
import ListaEmpresas from "../../componentes/listaEmpresas/ListaEmpresas.jsx";
import "./Empresas.css";
import Select from "../../componentes/select/Select.jsx";
import useTecnologiasTipo from "../../hooks/useTecnologiasTipo.jsx";
import ModalAñadirEmpresa from "../../componentes/modalAñadireEmpresa/ModalAñadirEmpresa.jsx";

function Empresas(props) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || null;
    const { listaEmpresas, isLoading, error } = useEmpresas(token);
    const colores = useContext(ColoresContext);
    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");
    const [showModalAñadirEmpresa, setShowModalAñadirEmpresa] = useState(false);

    const handleShowModalAñadirEmpresa = () => {
        setShowModalAñadirEmpresa(true);
    };
    const handleCloseModalAñadirEmpresa = () => {
        setShowModalAñadirEmpresa(false);
    };

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
            nombre: "Más valoradas"
        },
        {
            id: 2,
            nombre: "Menos valoradas"
        },
    ];


    // Lógica de filtros

    const [filtros, setFiltros] = useState({
        front: "Sin definir",
        back: "Sin definir",
        modalidad: "Sin definir",
        valoracion: "Sin definir"
    });

    function asignarFront(valorNuevo) {
        setFiltros({ ...filtros, front: valorNuevo });
    }

    function asignarBack(valorNuevo) {
        setFiltros({ ...filtros, back: valorNuevo });
    }

    function asignarModalidad(valorNuevo) {
        setFiltros({ ...filtros, modalidad: valorNuevo });
    }

    function asignarValoracion(valorNuevo) {
        setFiltros({ ...filtros, valoracion: valorNuevo });
    }

    function aplicarFiltros(empresa) {
        if (filtros.front !== "Sin definir" && !empresa.tecnologiasFront.includes(filtros.front)) {
            return false;
        }

        if (filtros.back !== "Sin definir" && !empresa.tecnologiasBack.includes(filtros.back)) {
            return false;
        }

        if (filtros.modalidad !== "Sin definir" && empresa.remoto !== filtros.modalidad) {
            return false;
        }

        return true;
    }

    function ordenarEmpresas(empresas) {
        const { valoracion } = filtros;

        if (valoracion === "Más valoradas") {
            return empresas.sort((a, b) => b.notaMedia - a.notaMedia);
        } else if (valoracion === "Menos valoradas") {
            return empresas.sort((a, b) => a.notaMedia - b.notaMedia);
        } else {
            return empresas;
        }
    }

    function resetFiltros() {
        // Reset estado filtros
        setFiltros({
            front: "Sin definir",
            back: "Sin definir",
            modalidad: "Sin definir",
            valoracion: "Sin definir"
        });
        // Reset de los select
        document.getElementById("front").value = "Sin definir"; 
        document.getElementById("back").value = "Sin definir";
        document.getElementById("modalidad").value = "Sin definir";
        document.getElementById("ordenar").value = "Sin definir";
    }
        
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
                            <Select gestion={asignarFront} color={colores[modoColor].Texto.principal} nombre="front" id="front" placeholder="Front-end" opciones={listaDatosFront} />
                            <Select gestion={asignarBack} color={colores[modoColor].Texto.principal} nombre="back" id="back" placeholder="Back-end" opciones={listaDatosBack} />
                            <Select gestion={asignarModalidad} color={colores[modoColor].Texto.principal} nombre="modalidad" id="modalidad" placeholder="Modalidad" opciones={modalidad} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="centrar2">
                            <p style={{ color: colores[modoColor].Texto.principal }} className="d-md-inline tituloFiltro"><strong>ORDENAR</strong></p>
                            <Select gestion={asignarValoracion} color={colores[modoColor].Texto.principal} nombre="ordenar" id="ordenar" placeholder="Valoración" opciones={valoraciones} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="centrar2">
                            <button onClick={resetFiltros} className="resetFiltros">Borrar filtros</button>
                            {user.rol === "profesor" && (
                            <button contenido="Crear empresa" onClick={handleShowModalAñadirEmpresa} className="newEmpresa" >Añadir Empresa</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <ListaEmpresas infoGuardada={props.infoGuardada} lista={ordenarEmpresas(listaEmpresas.filter(aplicarFiltros))}></ListaEmpresas>
                </div>
                <div className="row">
                    <div className="col-12" style={{ backgroundColor: colores[modoColor].Fondos.footer }}>
                        <p style={{ color: colores[modoColor].Texto.principal }} className="pFooter" >&#169; DevExperience | Diseñado por: Manuel Fernández y Jesús Rial | Proyecto TFG DAW 2024</p>
                    </div>
                </div>

                {user.rol === "profesor" && (
                <ModalAñadirEmpresa 
                    token={token} 
                    show={showModalAñadirEmpresa} 
                    handleClose={handleCloseModalAñadirEmpresa} 
                    modoColor={modoColor}
                />
            )}
            </div>
        </div>
    );
}

export default Empresas;