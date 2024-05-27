import React, { useState, useContext } from 'react';
import './modalAñadirEmpresa.css'
import { Modal } from 'react-bootstrap';
import { Logo } from '../logo/Logo';
import ColoresContext from "../../contextos/ColoresContext";

function ModalAñadirEmpresa(props) {
    const colores = useContext(ColoresContext);
    
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

            <Modal.Body style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal, borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                    
            </Modal.Body>
        </Modal>

    )

}

export default ModalAñadirEmpresa;