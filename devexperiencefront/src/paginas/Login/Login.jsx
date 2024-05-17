import React, { useState, useContext } from 'react';
import { sendLoginDetails } from '../../servicios/sendLoginDetails';
import { Modal, Button } from 'react-bootstrap';
import ColoresContext from "../../contextos/ColoresContext";
import './Login.css';
import { Logo } from '../../componentes/logo/Logo';
import Boton from '../../componentes/boton/Boton';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const colores = useContext(ColoresContext);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const loginDetails = { email, password };
            const token = await sendLoginDetails(loginDetails);

            if (token) {
                const newUser = {
                    token: token,
                    foto: "Sin definir",
                };
                props.cambiarUsuario(newUser);
                setEmail('');
                setPassword('');
                props.handleClose();
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (error) {
            setError('Credenciales incorrectas');
            console.error("Error al enviar el login: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={props.show} onHide={props.handleClose} body={false} >
            <Modal.Header className="my-modal-header" closeButton style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal, border: '0px' }}>
                <div className="header-content">
                    <Logo tema={props.modoColor == 'Dark' ? true : false} />
                </div>
            </Modal.Header>
            <div className="header-content">
                <h2 style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal, marginBottom: '0px' }}>¡Bienvenido de nuevo a DevExperience!</h2>
            </div>
            <Modal.Body style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal }}>
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
                    <div className="header-content" >
                        <Boton type="submit" disabled={loading} contenido={loading ? 'Cargando...' : 'Acceder'}/>          
                    </div>

                </form>
            </Modal.Body>
        </Modal>
    );
}

export default Login;
