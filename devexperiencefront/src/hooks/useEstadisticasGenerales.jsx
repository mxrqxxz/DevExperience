import React, { useEffect, useState } from 'react';
import { getEstadisticasGenerales } from '../servicios/getEstadisticasGenerales.jsx';

const useEstadisticasGenerales = () => {
    
    const [listaDatos, setListaDatos] = useState({});

    function obtenerDatos() {
        getEstadisticasGenerales().then(datos => {
            setListaDatos(datos);
        });
    }

    useEffect(obtenerDatos, []);

  return {listaDatos};
}
export default useEstadisticasGenerales;