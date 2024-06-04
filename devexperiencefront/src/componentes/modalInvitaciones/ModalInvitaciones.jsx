import React, { useState, useContext } from 'react';
import './modalInvitaciones.css';
import { Modal } from 'react-bootstrap';
import ColoresContext from "../../contextos/ColoresContext";
import { sendInvitaciones } from '../../servicios/sendInvitaciones';

function ModalInvitaciones(props) {
    const colores = useContext(ColoresContext);
    const [NRES, setNRES] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleAccept = async () => {
        try {
            const result = await sendInvitaciones(NRES, props.token);
            alert(result.message); 
        } catch (error) {
            console.log("prueba", error);
            alert('Error al enviar las invitaciones');
        }
        setNRES([]);
        // Cerrar el modal
        props.handleClose();
    };

    const handleAñadir = () => {
        setNRES([...NRES, inputValue]);
        setInputValue('');
    };

    const cerrarModal = () => {
        setNRES([]);
        props.handleClose();
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <Modal show={props.show} onHide={cerrarModal} body={false}>
            <Modal.Header
                closeButton
                style={{
                    backgroundColor: colores[props.modoColor].Fondos.principal,
                    color: colores[props.modoColor].Texto.principal,
                    border: '0px',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                    paddingBottom: '0px'
                }}
            >
                <div className="modal-header-content">
                    <h3 className='text-modal-cabecera'>Enviar Invitaciones</h3>
                </div>
            </Modal.Header>

            <Modal.Body style={{
                backgroundColor: colores[props.modoColor].Fondos.principal,
                color: colores[props.modoColor].Texto.principal,
                borderBottomLeftRadius: '15px',
                borderBottomRightRadius: '15px'
            }}>
                <div className="row">
                    <div className='col-12'>
                        <h5>Añadir NRE del alumno</h5>
                        <input 
                            type="text" 
                            id="nre" 
                            name="nre" 
                            placeholder="Ejemplo: 1808965" 
                            value={inputValue} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className='col-12 mt-3'>
                        <textarea
                            value={NRES.join('\n')}
                            disabled
                            style={{ width: '100%', height: '100px' }}
                        />
                    </div>

                    <div className='col-4 d-flex justify-content-center pt-3'>
                        <button 
                            variant="primary" 
                            onClick={handleAñadir} 
                            className='boton'
                            disabled={!inputValue.trim()}
                        >
                            Añadir
                        </button>
                    </div>

                    <div className='col-4 d-flex justify-content-center pt-3'>
                        <button 
                            variant="primary" 
                            onClick={handleAccept} 
                            className='boton'
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalInvitaciones;
