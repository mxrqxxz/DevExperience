import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ColoresContext from "../../contextos/ColoresContext";
import './modalFormulario.css';
import { getCatalogos } from '../../servicios/getCatalogos';
import { sendFormData } from '../../servicios/sendFormulario';

function ModalFormulario(props) {
    const colores = useContext(ColoresContext);
    const [paginaActual, setPaginaActual] = useState(0);
    const [catalogos, setCatalogos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCatalogos();
            if (data) {
                setCatalogos(data);
            }
        };

        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        remoto: '',
        opcion_quedarse: '',
        salario_ofrecido: '',
        val_empresa: '',
        val_formacion: '',
        val_ambiente_trabajo: '',
        tipo_jornada: '',
        hora_entrada: '',
        hora_salida: '',
        tiempo_descanso: '',
        equipo_trabajo: '',
        empresa_id: '',
        centro_id: '',
    
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };
    const handleCloseAndReset = () => {
       
        setFormData({
            remoto: '',
            opcion_quedarse: '',
            salario_ofrecido: '',
            val_empresa: '',
            val_formacion: '',
            val_ambiente_trabajo: '',
            tipo_jornada: '',
            hora_entrada: '',
            hora_salida: '',
            tiempo_descanso: '',
            equipo_trabajo: '',
            empresa_id: '',
            centro_id: '',
        });
        setPaginaActual(0); 
        props.handleClose();
    };
    const paginasFormulario = [
        {
            pregunta: "¿En qué centro estudiaste?",
            componente: (
                <select
                    name="centro_id"
                    value={formData.centro_id}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Seleccione un centro</option>
                    {catalogos.centros && catalogos.centros.map(catalogo => (
                        <option key={catalogo.id} value={catalogo.id}>{catalogo.nombre}</option>
                    ))}
                </select>
            )
        },
        {
            pregunta: "¿En qué empresa has realizado las prácticas?",
            componente: (
                <select
                    name="empresa_id"
                    value={formData.empresa_id}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Seleccione una empresa</option>
                    {catalogos.empresas && catalogos.empresas.map(empresa => (
                        <option key={empresa.id} value={empresa.id}>{empresa.nombre}</option>
                    ))}
                </select>
            )
        },
        {
            pregunta: "Front-end y Frameworks",
            componente: (
                <select
                    name="frontend_id"
                    value={formData.frontend_id}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Seleccione un framework</option>
                    {catalogos.front && catalogos.front.map(front => (
                        <option key={front.id} value={front.id}>{front.nombre}</option>
                    ))}
                </select>
            )
        },
        {
            pregunta: "Back-end y Frameworks",
            componente: (
                <select
                    name="backend_id"
                    value={formData.backend_id}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Seleccione un framework</option>
                    {catalogos.back && catalogos.back.map(back => (
                        <option key={back.id} value={back.id}>{back.nombre}</option>
                    ))}
                </select>
            )
        },
        {
            pregunta: "Control de versiones",
            componente: (
                <select
                    name="control_version_id"
                    value={formData.control_version_id}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Seleccione una herramienta</option>
                    {catalogos.control && catalogos.control.map(control => (
                        <option key={control.id} value={control.id}>{control.nombre}</option>
                    ))}
                </select>
            )
        },
        {
            pregunta: "Base de datos",
            componente: (
                <select
                    name="bd_id"
                    value={formData.bd_id}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Seleccione una base de datos</option>
                    {catalogos.bd && catalogos.bd.map(bd => (
                        <option key={bd.id} value={bd.id}>{bd.nombre}</option>
                    ))}
                </select>
            )
        },
        {
            pregunta: "¿Las prácticas han sido en remoto?",
            componente: (
                <select
                    name="remoto"
                    value={formData.remoto}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                </select>
            )
        },
        {
            pregunta: "¿Te han ofrecido quedarte trabajando en la empresa?",
            componente: (
                <select
                    name="opcion_quedarse"
                    value={formData.opcion_quedarse}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                </select>
            )
        },
        {
            pregunta: "Valoración de la empresa del 1 al 10",
            componente: (
                <input
                    type="number"
                    name="val_empresa"
                    value={formData.val_empresa}
                    onChange={(e) => {
                        const value = Math.max(1, Math.min(10, Number(e.target.value)));
                        setFormData({ ...formData, val_empresa: value });
                    }}
                    min="1"
                    max="10"
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            )
        },
        {
            pregunta: "Valora la formación que te ha ofrecido la empresa del 1 al 10",
            componente: (
                <input
                    type="number"
                    name="val_formacion"
                    value={formData.val_formacion}
                    onChange={(e) => {
                        const value = Math.max(1, Math.min(10, Number(e.target.value)));
                        setFormData({ ...formData, val_formacion: value });
                    }}
                    min="1"
                    max="10"
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            )
        },
        {
            pregunta: "Valora el ambiente de trabajo en tus prácticas del 1 al 10",
            componente: (
                <input
                    type="number"
                    name="val_ambiente_trabajo"
                    value={formData.val_ambiente_trabajo}
                    onChange={(e) => {
                        const value = Math.max(1, Math.min(10, Number(e.target.value)));
                        setFormData({ ...formData, val_ambiente_trabajo: value });
                    }}
                    min="1"
                    max="10"
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            )
        }        
        ,
        {
            pregunta: "¿Si te han contratado, qué salario te ha ofrecido la empresa?(anual)",
            componente: (
                <input
                    type="number"
                    name="salario_ofrecido"
                    value={formData.salario_ofrecido}
                    onChange={(e) => {
                        const value = e.target.value;
                        
                        if (value === '' || /^[0-9\b]+$/.test(value)) {
                            setFormData({ ...formData, salario_ofrecido: value });
                        }
                    }}
                    placeholder="Ingrese el salario ofrecido"
                    min="0"
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            )
        }
        ,
        {
            pregunta: "Jornada continua o partida",
            componente: (
                <select
                    name="tipo_jornada"
                    value={formData.tipo_jornada}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="Continua">Continua</option>
                    <option value="Partida">Partida</option>
                </select>
            )
        }
        ,
        {
            pregunta: "Hora de Entrada",
            componente: (
                <input
                    type="time"
                    name="hora_entrada"
                    value={formData.hora_entrada}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            )
        },
        {
            pregunta: "Hora de Salida",
            componente: (
                <input
                    type="time"
                    name="hora_salida"
                    value={formData.hora_salida}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            )
        },
        {
            pregunta: "Tiempo de Descanso en Minutos",
            componente: (
                <input
                    type="text"
                    name="tiempo_descanso"
                    value={formData.tiempo_descanso}
                    onChange={handleInputChange}
                    placeholder="Ingrese el tiempo de descanso"
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            )
        }
        
        ,
        {
            pregunta: "¿Te ha ofrecido la empresa un equipo de trabajo?",
            componente: (
                <select
                    name="equipo_trabajo"
                    value={formData.equipo_trabajo}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                </select>
            )
        }
    ];

    const handleSiguiente = () => {
        if (paginaActual < paginasFormulario.length - 1) {
            setPaginaActual(paginaActual + 1);
        }
    };
    const handleSubmit = async () => {
        try {
            const result = await sendFormData(formData, props.token);
            alert(result.message); 
            handleCloseAndReset(); 
        } catch (error) {
            alert('Error al enviar el formulario');
        }
    };
    const isSiguienteDisabled = () => {
        const currentQuestion = paginasFormulario[paginaActual];
        const fieldName = currentQuestion.componente.props.name;
        return !formData[fieldName] || formData[fieldName] === '';
    };

    return (
        <Modal show={props.show} onHide={props.handleClose}>
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
                <Button variant="secondary" onClick={handleCloseAndReset}>Cerrar</Button>
                {paginaActual < paginasFormulario.length - 1 && <Button variant="primary" onClick={handleSiguiente} disabled={isSiguienteDisabled()}>Siguiente</Button>}
                {paginaActual === paginasFormulario.length - 1 && <Button variant="primary" onClick={handleSubmit}>Enviar</Button>}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalFormulario;
