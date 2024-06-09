import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import ColoresContext from "../../contextos/ColoresContext";
import './Login.css';
import { Logo } from '../../componentes/logo/Logo';
import Boton from '../../componentes/boton/Boton';
import { sendRegisterDestails } from '../../servicios/sendRegisterDetails';

function Register(props) {
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const colores = useContext(ColoresContext);

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
            const registerDetails = { email, password, usuario, nombre, apellidos, confirm_password: confirmPassword };
            const { token, errorMessage } = await sendRegisterDestails(registerDetails);
    
            if (token) {
                const newUser = {
                    token: token,
                    foto: "Sin definir",
                };
                props.cambiarUsuario(newUser);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setUsuario('');
                setNombre('');
                setApellidos('');
                props.handleClose();
            } else {
                setError(errorMessage || 'Error al registrarse');
            }
        } catch (error) {
            setError('Datos incorrectos');
            console.error("Error al registrarse: ", error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <Modal show={props.show} onHide={props.handleClose} body={false}>
            <Modal.Header 
                className="my-modal-header" 
                closeButton 
                style={{ 
                    backgroundColor: colores[props.modoColor].Fondos.principal, 
                    color: colores[props.modoColor].Texto.principal, 
                    border: '0px', 
                    borderTopLeftRadius: '15px', 
                    borderTopRightRadius: '15px' 
                }}
            >
                <div className="header-content">
                    <Logo tema={props.modoColor === 'Dark'} />
                </div>
            </Modal.Header>
            <div className="header-content">
                <h2 
                    style={{ 
                        backgroundColor: colores[props.modoColor].Fondos.principal, 
                        color: colores[props.modoColor].Texto.principal, 
                        marginBottom: '0px' 
                    }}
                >
                    Forma parte de una comunidad que impulsa tu carrera hacia adelante. ¡Regístrate ahora!
                </h2>
            </div>
            <Modal.Body 
                style={{ 
                    backgroundColor: colores[props.modoColor].Fondos.principal, 
                    color: colores[props.modoColor].Texto.principal, 
                    borderBottomLeftRadius: '15px', 
                    borderBottomRightRadius: '15px' 
                }}
            >
                <form onSubmit={handleRegister} autoComplete="off">
                    <div className="mb-3">
                        <label>Usuario</label>
                        <input
                            type="text"
                            placeholder="Introduce tu usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                            className="form-control"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Nombre</label>
                        <input
                            type="text"
                            placeholder="Introduce tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="form-control"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Apellidos</label>
                        <input
                            type="text"
                            placeholder="Introduce tus apellidos"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            required
                            className="form-control"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Introduce tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control"
                            autoComplete="new-email"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Introduce tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Confirmar contraseña</label>
                        <input
                            type="password"
                            placeholder="Confirma tu contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="form-control"
                            autoComplete="new-password"
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="header-content">
                        <Boton type="submit" disabled={loading} contenido={loading ? 'Cargando...' : 'Registrarse'} />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default Register;
