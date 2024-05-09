import React, { useEffect, useState } from 'react';
import { getDatosTotales } from '../servicios/getDatosTotales.jsx';

const useDatosTotales = () => {
    
    const [listaDatos, setListaDatos] = useState({
        porcentajeTecnologias: {},
        datosTotales: {}
    });

    function obtenerDatos() {
        getDatosTotales().then(datos => {
            console.log('CONSOLE LOG HOOK');
            console.log(datos);
            setListaDatos(datos);
        });
    }

    useEffect(obtenerDatos, []);

  return {listaDatos};
}
export default useDatosTotales;