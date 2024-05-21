import React, { useContext, useEffect, useState } from "react";
import "./ListaEmpresas.css";
import EmpresaCard from "../empresaCard/EmpresaCard.jsx";
import ColoresContext from "../../contextos/ColoresContext.jsx";


function ListaEmpresas(props) {

    const colores = useContext(ColoresContext);
    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Dark" : "Light";
            setModoColor(newColorMode);
        };
        updateColorMode();
    }, [props.infoGuardada.darkmode]);

    function muestraEmpresa(empresa, index) {

        return <EmpresaCard key={index} empresa={empresa}></EmpresaCard>;
    }

    return (
        <div className="col-12">
            <h5 style={{ color: colores[modoColor].Texto.principal }} className="resultados"><strong>Resultados:</strong> <span className="colorAzul">{props.lista.length}</span> empresas encontradas</h5>
            <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.terciario }}>
                {props.lista.length === 0 ? <h1>No hay empresas con estos filtros</h1> : props.lista.map(muestraEmpresa)}
            </div>
        </div>
    );
}

export default ListaEmpresas;