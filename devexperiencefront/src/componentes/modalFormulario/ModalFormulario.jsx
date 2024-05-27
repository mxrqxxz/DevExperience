import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ColoresContext from "../../contextos/ColoresContext";
import './modalFormulario.css';

function ModalFormulario(props) {
    const colores = useContext(ColoresContext);
    const [paginaActual, setPaginaActual] = useState(0);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        sobre_mi: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const paginasFormulario = [
        {
            pregunta: "¿Cuál es tu nombre?",
            componente: (
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            )
        },
        {
            pregunta: "¿Cuál es tu correo electrónico?",
            componente: (
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            )
        },
        {
            pregunta: "¿Cuéntanos sobre ti?",
            componente: (
                <textarea
                    name="sobre_mi"
                    value={formData.sobre_mi}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            )
        }
    ];

    const handleSiguiente = () => {
        if (paginaActual < paginasFormulario.length - 1) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const handleAnterior = () => {
        if (paginaActual > 0) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const handleSubmit = () => {
        // Maneja el envío del formulario
        props.handleSubmit(formData);
        props.handleClose();
    };

    return (
        <Modal show={props.show} onHide={props.handleClose} body={false}>
            <Modal.Header closeButton style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal }}>
                <div className="modal-header-content">
                    <h3 className='text-modal-cabecera'>{paginasFormulario[paginaActual].pregunta}</h3>
                </div>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal }}>
                {paginasFormulario[paginaActual].componente}
                <div className="indicadores">
                    {paginasFormulario.map((_, index) => (
                        <span key={index} className={`bolita ${index === paginaActual ? 'activa' : ''}`}></span>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal }}>
                <Button variant="secondary" onClick={props.handleClose}>Cerrar</Button>
                {paginaActual > 0 && <Button variant="primary" onClick={handleAnterior}>Anterior</Button>}
                {paginaActual < paginasFormulario.length - 1 && <Button variant="primary" onClick={handleSiguiente}>Siguiente</Button>}
                {paginaActual === paginasFormulario.length - 1 && <Button variant="primary" onClick={handleSubmit}>Enviar</Button>}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalFormulario;
