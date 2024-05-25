import React, { useState, useContext } from 'react';
import './modalCuentas.css'
import { Modal } from 'react-bootstrap';
import ColoresContext from "../../contextos/ColoresContext";

function ModalCuentas(props) {
    const colores = useContext(ColoresContext);
    const [selectedCuenta, setSelectedCuenta] = useState('');
    const [cuentasActualizadas, setCuentasActualizadas] = useState([]);
    const [perfil, setPerfil] = useState('');

    const handleSelectChange = (event) => {
        const selectedId = event.target.value;
        const nombreCuenta = event.target.options[event.target.selectedIndex].text;
        setSelectedCuenta(selectedId);
        const selectedCuentaObj = props.cuentas.find(cuenta => cuenta.nombre === nombreCuenta);
        if (selectedCuentaObj) {
            setPerfil(selectedCuentaObj.url);
        }
    };

    const handleInputChange = (event) => {
        setPerfil(event.target.value);
        const selectedId = selectedCuenta;

        // Crear una nueva cuenta actualizada
        const cuentaActualizada = { id: selectedId, url: event.target.value };

        // Verificar si la cuenta ya está en el array de cuentas actualizadas
        const index = cuentasActualizadas.findIndex(cuenta => cuenta.id === selectedId);

        // Crear una copia del array de cuentas actualizadas
        let nuevasCuentasActualizadas = [...cuentasActualizadas];

        if (index >= 0) {
            // Si la cuenta ya existe, actualizarla
            nuevasCuentasActualizadas[index] = cuentaActualizada;
        } else {
            // Si la cuenta no existe, agregarla
            nuevasCuentasActualizadas.push(cuentaActualizada);
        }

        // Actualizar el estado de cuentas actualizadas
        setCuentasActualizadas(nuevasCuentasActualizadas);
    };

    const handleAccept = () => {
        // Pasar el array completo de cuentas actualizadas al componente padre
        props.handleCtaPerfil(cuentasActualizadas);
        setCuentasActualizadas([]);
        setPerfil('');
        setSelectedCuenta('');
        
        // Cerrar el modal
        props.handleClose();
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
                    borderTopRightRadius: '15px',
                    paddingBottom: '0px'
                }}
            >
                <div className="modal-header-content">
                    <h3 className='text-modal-cabecera'>Cambiar cuentas</h3>
                </div>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal, borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                <div className="row">
                    <div className='col-12'>
                        <h5>Cuenta</h5>
                        <select name="catCuentas" id="catCuentas" onChange={handleSelectChange}>
                            <option value="">Seleccione una cuenta</option>
                            {props.catCuentas && props.catCuentas.map((cuenta, index) => {
                                return (
                                    <option key={'cuenta' + index} value={cuenta.id}>{cuenta.nombre}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col-12'>
                        <label style={{ marginTop: "10px" }}>
                            <h5>Perfil</h5>
                            <div className='row'>

                            </div>
                            <input
                                type="text"
                                name="perfil"
                                value={perfil}
                                onChange={handleInputChange}
                                style={{ width: '450px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                        </label>
                    </div>
                    <span className='col-4'></span>
                    <div className='col-4 d-flex justify-content-center pt-3'>
                        <button variant="primary" onClick={handleAccept} className='boton'>
                            Aceptar
                        </button>
                    </div>
                    <span className='col-4'></span>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalCuentas;
