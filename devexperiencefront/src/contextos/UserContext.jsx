import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    const [usuario, setUser] = useState(null);

    useEffect(() => {
        // Recuperar el usuario del localStorage cuando la aplicación se monte
        const storedUser = localStorage.getItem('user');
        // Si hay un usuario almacenado, actualizar el estado
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const cambiarUsuario = (newUser) => {
        setUser(newUser);
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('user');
        }
    };
    return (
        <UserContext.Provider value={{ usuario, cambiarUsuario }}>
            {children}
        </UserContext.Provider>
    );
};
