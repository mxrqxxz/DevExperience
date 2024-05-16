import React, { useState, useEffect } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Utiliza tu función de login del contexto
    const [csrfToken, setCsrfToken] = useState('');

    // Obtener el token CSRF cuando el componente se monta
    useEffect(() => {
        // En tu componente React, al cargar el componente o antes de hacer la solicitud POST
        fetch('http://devexperience.test/api/v1/csrf-token', {
            method: 'GET',
            credentials: 'include' 
        })
            .then(response => response.json())
            .then(data => {
                setCsrfToken(data.csrfToken)
                
            });

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(csrfToken);
            const response = await fetch('http://devexperience.test/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            if (response.ok) {
                login(data.token); // Guarda el token usando el contexto
            } else {
                throw new Error(data.message || 'Error al hacer login');
            }
        } catch (error) {
            console.error('Error de Login:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Usuario</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
