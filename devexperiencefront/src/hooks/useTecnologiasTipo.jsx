import React, { useEffect, useState } from 'react';
import { getTecnologiasTipo } from '../servicios/getTecnologiasTipo';

const useTecnologiasTipo = (tipo) => {
    
    const [listaDatos, setListaDatos] = useState([]);

    function obtenerDatos() {
        getTecnologiasTipo(tipo).then(datos => {
            setListaDatos(datos);
        });
    }

    useEffect(obtenerDatos, []);

  return {listaDatos};
}
export default useTecnologiasTipo;