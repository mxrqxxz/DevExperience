import React from "react";
import "./ListaEmpresas.css";
import EmpresaCard from "../empresaCard/EmpresaCard.jsx";

function ListaEmpresas(props) {

    function muestraEmpresa(empresa, index) {  

        return <EmpresaCard  key={index} empresa={empresa}></EmpresaCard>;
      }

    return (
            <div className="col-12">
                <h5 className=""><strong>Resultados:</strong> <span className="colorAzul">{props.lista.length}</span> empresas encontradas</h5>
                <div className="row p-4">
                    {props.lista.length === 0 ? <h1>No hay empresas con estos filtros</h1> : props.lista.map(muestraEmpresa)}
                </div>
            </div>
    );
}

export default ListaEmpresas;