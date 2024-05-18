import { useEffect, useState } from 'react';
import { getPerfil } from '../servicios/getPerfil';

const useDatosPerfil = (token) => {
    const [datosPerfil, setDatosPerfil] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            getPerfil(token)
                .then(datos => {
                    setDatosPerfil(datos);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(err);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [token]);

    return { datosPerfil, isLoading, error };
}

export default useDatosPerfil;
