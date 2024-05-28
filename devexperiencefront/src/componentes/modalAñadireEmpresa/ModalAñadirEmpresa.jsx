import React, { useState, useContext } from 'react';
import './modalAñadirEmpresa.css'
import { Modal } from 'react-bootstrap';
import { Logo } from '../logo/Logo';
import ColoresContext from "../../contextos/ColoresContext";
import Boton from '../boton/Boton';
import { sendCrearEmpresa } from '../../servicios/sendCrearEmpresa';

function ModalAñadirEmpresa(props) {
    const colores = useContext(ColoresContext);

    const [cif, setCif] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCrearEmpresa = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const imagen = document.getElementById('file-1').files[0];
            const details = { cif, nombre, direccion, imagen, token: props.token};
            await sendCrearEmpresa(details);
        } catch (error) {
            setError('No autorizado');
            console.error("Error al crear la empresa: ", error);
        } finally {
            setLoading(false);
            props.handleClose();
        }
    };
    
    return (
        <Modal show={props.show} onHide={props.handleClose} body={false} >
            <Modal.Header
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
                <h2 style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal }} className='p-2'>ALTA DE UNA NUEVA EMPRESA</h2>
            </div>
            <Modal.Body style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal, borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                <form onSubmit={handleCrearEmpresa}>
                    <div className="mb-3">
                        <label>CIF</label>
                        <input
                            type="text"
                            value={cif}
                            onChange={(e) => setCif(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Dirección</label>
                        <input
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        {/* INPUT FILE */}
                    <div className="container-input">
                        <input type="file" name="file-1" id="file-1" className="inputfile inputfile-1" data-multiple-caption="{count} archivos seleccionados" multiple />
                        <label for="file-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                        <span className="iborrainputfile">Subir imagen</span>
                        </label>
                    </div>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="header-content" >
                        <Boton type="submit" disabled={loading} contenido={loading ? 'Cargando...' : 'Acceder'}/>          
                    </div>

                </form>
            </Modal.Body>
        </Modal>

    )

}

export default ModalAñadirEmpresa;