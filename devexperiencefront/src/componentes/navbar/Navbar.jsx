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
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Dark" : "Light";
            setModoColor(newColorMode);
        };

        updateColorMode();
    }, [props.infoGuardada.darkmode]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsNavCollapsed(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleNavbar = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    return (
        <nav className="navbar navbar-expand-md p-0 sticky-top">
            <div className="container-fluid p-3" style={{ backgroundColor: colores[modoColor].Fondos.principal }}>
                <button className="navbar-toggler" type="button"
                    onClick={toggleNavbar}
                    aria-controls="navbarNav"
                    aria-expanded={!isNavCollapsed}
                    aria-label="Toggle navigation"
                    style={{borderColor: colores[modoColor].Texto.principal}}>
                    {props.infoGuardada.darkmode ? <span className="navbar-toggler-icon navbar-dark"></span> : <span className="navbar-toggler-icon navbar-light"></span>}
                </button>

                <Logo tema={props.infoGuardada.darkmode} />

                <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarNav" color={colores[modoColor].Texto.principal} style={{ backgroundColor: colores[modoColor].Fondos.principal }}>
                    <Enlace to={'/'} texto={'Inicio'} color={colores[modoColor].Texto.principal}></Enlace>
                    <Enlace to={'/empresas'} texto={'Empresas'} color={colores[modoColor].Texto.principal}></Enlace>
                    <Enlace to={'/estadisticas'} texto={'Estadisticas'} color={colores[modoColor].Texto.principal}></Enlace>
                    <Enlace to={'/soporte'} texto={'Soporte'} color={colores[modoColor].Texto.principal}></Enlace>
                </div>
                <div className="d-flex align-items-center">
                    <Tema cambiarDarkmode={props.cambiarDarkmode} tema={props.infoGuardada.darkmode}></Tema>
                    <PerfilNavbar tema={props.infoGuardada.darkmode}s></PerfilNavbar>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;