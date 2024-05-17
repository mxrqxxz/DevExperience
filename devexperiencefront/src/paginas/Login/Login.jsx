import React, { useState } from 'react';
import { sendLoginDetails } from '../../servicios/sendLoginDetails';
import { Modal, Button } from 'react-bootstrap';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const loginDetails = { email, password };
            const token = await sendLoginDetails(loginDetails);
            const newUser = {
                token: token,
                foto: "Sin definir"
            };
            props.cambiarUsuario(newUser);
            setEmail('');
            setPassword('');
            handleClose(); 
        } catch (error) {
            setError('Error al enviar el login');
            console.error("Error al enviar el login: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Login'}
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default Login;
