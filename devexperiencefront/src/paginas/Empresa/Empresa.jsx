import React, { useEffect, useState, useContext } from "react";
import "./Empresa.css";
import ColoresContext from "../../contextos/ColoresContext.jsx";
import { useParams } from 'react-router-dom';
import Navbar from '../../componentes/navbar/Navbar.jsx';
import useEmpresa from "../../hooks/useEmpresa.jsx";
import fotoDefault from "../../assets/imgs/empresas/portadaEmpresa.jpg";


function Empresa(props) {

    // Colores

    const colores = useContext(ColoresContext);
    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Dark" : "Light";
            setModoColor(newColorMode);
        };
        updateColorMode();
    }, [props.infoGuardada.darkmode]);

    // User

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || null;

    // Empresa

    const { idEmpresa } = useParams();

    const { listaDatos } = useEmpresa(token, idEmpresa);

    console.log(listaDatos);

    const nota = Math.round(listaDatos?.cabecera?.val_media * 10) / 10;
    const colorNota = nota >= 8 ? "green" : nota >= 5 ? "yellow" : "red";

    // Asignamos una imagen default a la empresa
    const [imagenEmpresa, setImagenEmpresa] = useState(fotoDefault);

    useEffect(() => {
        // Comprobamos si la empresa tiene imagen propia
        if (listaDatos?.cabecera?.imagen !== null && listaDatos?.cabecera?.imagen !== "" && listaDatos?.cabecera?.imagen !== undefined && listaDatos?.cabecera?.imagen !== "url_example") {
            setImagenEmpresa("http://devexperience.test/storage/" + listaDatos?.cabecera?.imagen);
        }
    }, [listaDatos?.cabecera?.imagen]);

    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <div className="container-fluid p-0">
                <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.secundario }}>
                    <div className="col-12 p-5">
                        <div className="cabeceraEmpresa" style={{ backgroundColor: colores[modoColor].Fondos.terciario }}>
                            <div className="row">
                                <div className="col-5">
                                    <div className="centrarFoto">
                                        <img src={imagenEmpresa} alt="Logo de la empresa" className="fotoCabeceraEmpresa" />
                                    </div>
                                </div>
                                <div className="col-7">
                                    <h1 style={{ color: colores[modoColor].Texto.principal }}>{listaDatos?.cabecera?.nombre}</h1>
                                    <p className="textoCabeceraEmpresa" style={{ color: colores[modoColor].Texto.principal }}>Localizacion: {listaDatos?.cabecera?.localizacion}</p>
                                    <p className="textoCabeceraEmpresa" style={{ color: colores[modoColor].Texto.principal }}>Usuarios con experiencia en esta empresa: {listaDatos?.cabecera?.num_usuarios}</p>
                                    <p className="textoCabeceraEmpresa" style={{ color: colores[modoColor].Texto.principal }}>Valoración media: <span style={{ color: colorNota }}>{nota}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12" style={{ height: 400 }}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Empresa;