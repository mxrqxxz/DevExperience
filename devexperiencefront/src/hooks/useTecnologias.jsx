import React, { useEffect, useState } from 'react';
import { getTecnologias } from '../servicios/getTecnologias';

const useTecnologias = () => {
    
    const [listaDatos, setListaDatos] = useState([]);

    function obtenerDatos() {
        getTecnologias().then(datos => {
            setListaDatos(datos);
        });
    }

    useEffect(obtenerDatos, []);

  return {listaDatos};
}
export default useTecnologias;