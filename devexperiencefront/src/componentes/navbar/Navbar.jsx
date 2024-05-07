import React, { useEffect, useContext, useState } from "react";
import './navbar.css'
import { Logo } from "../logo/Logo";
import Enlace from "../enlace/Enlace";
import Tema from "../tema/Tema";
import ColoresContext from "../../contextos/ColoresContext";
import PerfilNavbar from "../perfilNavbar/PerfilNavbar";

function Navbar(props) {
    const colores = useContext(ColoresContext);

    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");

    useEffect(() => {
        const colorMode = props.infoGuardada.darkmode ? "Dark" : "Light";
        setModoColor(colorMode);
    }, [props.infoGuardada.darkmode]);

    return (
        <nav className="navbar navbar-expand-md">
            <div className="container-fluid p-3" style={{ backgroundColor: colores[modoColor].Fondos.principal }}>
                {/* Boton toggler */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Logo tema={props.infoGuardada.darkmode} className=""></Logo>
                
                <div className="collapse navbar-collapse justify-content-center " id="navbarNav" color={colores[modoColor].Texto.principal}>
                    <Enlace to={'/'} texto={'Inicio'} color={colores[modoColor].Texto.principal}></Enlace>
                    <Enlace to={'/empresas'} texto={'Empresas'} color={colores[modoColor].Texto.principal}></Enlace>
                    <Enlace to={'/estadisticas'} texto={'Estadisticas'} color={colores[modoColor].Texto.principal}></Enlace>
                    <Enlace to={'/soporte'} texto={'Soporte'} color={colores[modoColor].Texto.principal}></Enlace>
                </div>
                <div className="d-flex align-items-center ">
                    <Tema cambiarDarkmode={props.cambiarDarkmode} tema={props.infoGuardada.darkmode}></Tema>
                    <PerfilNavbar></PerfilNavbar>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;