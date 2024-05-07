import React, { useEffect } from "react";
import './navbar.css'
import { Logo } from "../logo/Logo";
import Enlace from "../enlace/Enlace";
import Tema from "../tema/Tema";

function Navbar(props) {

    /* useEffect(() => {
        localStorage.setItem("darkmode", darkmode);
        console.log(darkmode);
    }, [darkmode]) */
    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
                <Logo></Logo>
                {/* Boton toggler */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <Enlace to={'/'} texto={'Inicio'}></Enlace>
                    <Enlace to={'/empresas'} texto={'Empresas'}></Enlace>
                    <Enlace to={'/estadisticas'} texto={'Estadisticas'}></Enlace>
                    <Enlace to={'/soporte'} texto={'Soporte'}></Enlace>
                </div>
                <Tema cambiarDarkmode={props.cambiarDarkmode} tema={props.infoGuardada.darkmode}></Tema>
            </div>
        </nav>
    );
}

export default Navbar;