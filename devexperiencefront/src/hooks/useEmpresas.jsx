import { useEffect, useState } from 'react';
import { getEmpresas } from '../servicios/getEmpresas';

const useEmpresas = (token) => {
    const [listaEmpresas, setListaEmpresas] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            getEmpresas(token)
                .then(datos => {
                    setListaEmpresas(datos);
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

    return { listaEmpresas, isLoading, error };
}

export default useEmpresas;
