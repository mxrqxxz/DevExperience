import { useEffect, useState } from 'react';
import { getEmpresa } from '../servicios/getEmpresa';

const useEmpresa = (token, id) => {
    const [listaDatos, setListaDatos] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            getEmpresa(token, id)
                .then(datos => {
                    setListaDatos(datos);
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

    return { listaDatos, isLoading, error };
}

export default useEmpresa;
