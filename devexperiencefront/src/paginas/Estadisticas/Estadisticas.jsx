import React, { useContext, useEffect, useState } from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import ColoresContext from "../../contextos/ColoresContext";
import BarChartCustom from "../../componentes/BarChart/BarChartCustom.jsx";
import useEstadisticasGenerales from "../../hooks/useEstadisticasGenerales";

function Estadisticas(props) {

    const colores = useContext(ColoresContext);

    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Dark" : "Light";
            setModoColor(newColorMode);
        };

        updateColorMode();
    }, [props.infoGuardada.darkmode]);

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Light" : "Dark";
        };

        updateColorMode();
    }, [modoColor]);

    const { listaDatos } = useEstadisticasGenerales();

    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <div className="container-fluid p-0">
                <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.secundario }}>
                    {
                        listaDatos.estadisticas_tecnologias && 
                        <BarChartCustom data={listaDatos.estadisticas_tecnologias.front}/>
                    }
                </div>
                <div className="row">
                    <div className="col-12" style={{ backgroundColor: colores[modoColor].Fondos.footer }}>
                        <p style={{ color: colores[modoColor].Texto.principal }} className="pFooter" >&#169; DevExperience | Diseñado por: Manuel Fernández y Jesús Rial | Proyecto TFG DAW 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Estadisticas;