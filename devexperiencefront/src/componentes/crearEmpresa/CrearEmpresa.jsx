import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import ColoresContext from "../../contextos/ColoresContext";
import './crearEmpresa.css';
import { Logo } from '../logo/Logo';
import Boton from '../boton/Boton';

function CrearEmpresa(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const colores = useContext(ColoresContext);

    const handleLogin = async (event) => {
        event.preventDefault();
        
    };

    return (
        <Modal show={props.show} onHide={props.handleClose} body={false} >
            <Modal.Header className="my-modal-header" closeButton style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal, border: '0px', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                <div className="header-content">
                    <Logo tema={props.modoColor == 'Dark' ? true : false} />
                </div>
            </Modal.Header>
            <div className="header-content">
                <h2 style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal, marginBottom: '0px' }}>¡Bienvenido de nuevo a DevExperience!</h2>
            </div>
            <Modal.Body style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal, borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px'}}>
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

export default CrearEmpresa;
