import React, { useContext, useState, useEffect } from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import useDatosPerfil from '../../hooks/useDatosPerfil.jsx';
import ColoresContext from "../../contextos/ColoresContext.jsx";
import linkedIn from '../../assets//imgs/tecnologias/icons8-linkedin.svg';
import github from '../../assets/imgs/tecnologias/icons8-github.svg';
import aniadir from '../../assets/imgs/aniadir.svg';
import './Perfil.css';
import Avatar from '../../assets/imgs/Avatar.svg';
import ModalImgPerfil from "../../componentes/modalImgPerfil/ModalImgPerfil.jsx";
import { actualizarPerfil } from "../../servicios/actualizarPerfil.jsx";
import Alerta from "../../componentes/alerta/alerta.jsx";
import ModalCuentas from "../../componentes/modalCuentas/ModalCuentas.jsx";
import ModalFormulario from "../../componentes/modalFormulario/ModalFormulario.jsx";
import ModalInvitaciones from "../../componentes/modalInvitaciones/ModalInvitaciones.jsx";
import insignia1 from '../../assets/imgs/Insignias/insignia1.svg';
import insignia2 from '../../assets/imgs/Insignias/insignia2.svg';
import insignia3 from '../../assets/imgs/Insignias/insignia3.svg';
import insignia4 from '../../assets/imgs/Insignias/insignia4.svg';
import insignia5 from '../../assets/imgs/Insignias/insignia5.svg';
import insignia6 from '../../assets/imgs/Insignias/insignia6.svg';
import insignia7 from '../../assets/imgs/Insignias/insignia7.svg';

function Perfil(props) {
    const imagenes = {
        LinkedIn: linkedIn,
        Github: github
    };
    const insignias = {
        Insignia1: insignia1,
        Insignia2: insignia2,
        Insignia3: insignia3,
        Insignia4: insignia4,
        Insignia5: insignia5,
        Insignia6: insignia6,
        Insignia7: insignia7
    };
    const [alertaTipo, setAlertaTipo] = useState('correcto');

    const [perfilActualizado, setPerfilActualizado] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || null;
    const { datosPerfil, isLoading, error } = useDatosPerfil(token);
    const colores = useContext(ColoresContext);
    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");
    const [editableDatosPerfil, setEditableDatosPerfil] = useState(datosPerfil || {});
    const [cuentasActualizadas, setCuentasActualizadas] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableDatosPerfil({ ...editableDatosPerfil, [name]: value });
    };
    const [showImgModal, setShowImgModal] = useState(false);
    const [showCtaModal, setShowCtaModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const handleFormClose = () => {
        setShowFormModal(false);
    };
    const handleFormPerfil = () => {
        setShowFormModal(false);
    };
    const [showInvitacionModal, setShowInvitacionModal] = useState(false);
    const handleInvitacionClose = () => {
        setShowInvitacionModal(false);
    };
    const handleInvitacionClick = () => {
        setShowInvitacionModal(true);
    };
    const handleFormClick = () => {

        setShowFormModal(true);
    };
    const handleImgClick = () => {
        setShowImgModal(true);
    };
    const handleImgClose = () => {
        setShowImgModal(false);
    };
    const handleCtaClose = () => {
        setShowCtaModal(false);
    };
    const handleCtaClick = () => {
        setShowCtaModal(true);
    };
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImgPerfil = (image) => {
        if (typeof image === 'string') {
            // Es una ruta de imagen predefinida
            setEditableDatosPerfil({ ...editableDatosPerfil, avatar: image });
            setSelectedImage(image);
        } else {
            // Es un archivo
            setEditableDatosPerfil({ ...editableDatosPerfil, avatar: image });
            setSelectedImage(URL.createObjectURL(image)); // Genera una URL de objeto para la vista previa
        }
    };
    const handleCtaPerfil = (cuentasActualizadas) => {
        //quiero actualizar la url dentro de cuentas
        let cuentas = editableDatosPerfil.cuentas;
        cuentasActualizadas.forEach(cuenta => {
            cuentas.forEach(cuentaPerfil => {
                if (cuentaPerfil.nombre == editableDatosPerfil.cat_cuentas.find(cat => cat.id == cuenta.id).nombre) {
                    cuentaPerfil.url = cuenta.url;
                }
            });
        });
        setCuentasActualizadas(cuentasActualizadas);
        setEditableDatosPerfil({ ...editableDatosPerfil, cuentas: cuentas });
    };

    const actualizarDatosPerfil = async () => {
        const res = await actualizarPerfil(token, editableDatosPerfil, cuentasActualizadas);
        if (res) {
            mostrarMensaje();
            setAlertaTipo('correcto');
        } else {
            setAlertaTipo('error');
            console.log("Error al actualizar el perfil");
        }
    }

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Dark" : "Light";
            setModoColor(newColorMode);

        };
        updateColorMode();
    }, [props.infoGuardada.darkmode]);

    useEffect(() => {
        if (datosPerfil) {
            setEditableDatosPerfil(datosPerfil);
        }
    }, [datosPerfil]);

    const [urlFoto, setUrlFoto] = useState(Avatar);

    useEffect(() => {
        if (datosPerfil && datosPerfil.avatar !== null && datosPerfil.avatar !== "" && datosPerfil.avatar !== undefined && datosPerfil.avatar !== "url_example" && datosPerfil.avatar !== "Sin definir") {
            // Si es una foto almacenada
            if (datosPerfil.avatar.startsWith("imagenesPerfil/")) {
                setUrlFoto("http://devexperience.test/storage/" + datosPerfil.avatar);
            } else {
                // Si es una foto de google
                setUrlFoto(datosPerfil.avatar);
            }
        }
    }, [datosPerfil]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || "Error al cargar los datos del perfil"}</div>;
    }

    // Mensaje de formulario enviado
    function mostrarMensaje() {
        setPerfilActualizado(true);
        setTimeout(() => {
            setPerfilActualizado(false);
            //solo quiero que se reacargue si se ha cambiado el avatar
            if (selectedImage !== null || cuentasActualizadas.length > 0)
                window.location.reload();
        }, 2500);
    }

    return (
        <div className="container-fluid" style={{ minHeight: '100vh', backgroundColor: colores[modoColor].Fondos.secundario, color: colores[modoColor].Texto.principal, padding: 0 }}>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode} />
            {editableDatosPerfil && (
                <div className="row datosPerfil d-flex justify-content-center" >
                    <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.principal }}>
                        <div className="col-4 col-xl-3 p-0 d-flex justify-content-center align-items-center position-relative">
                            <img
                                className="img-fluid imgPerfil"
                                src={selectedImage === null ? urlFoto : selectedImage}
                                alt="Foto de perfil"
                            />
                            <img
                                className="imgAgregar"
                                src={aniadir}
                                onClick={handleImgClick}
                                alt="Cambiar imagen"
                                title="Cambiar imagen"
                            />
                        </div>
                        <div className="col-8 col-xl-9 p-0 d-flex align-items-center">
                            <div className="row">
                                <div className="row caja-general">
                                    <h2 className="col-12 p-0">Insignias</h2>
                                    {editableDatosPerfil && editableDatosPerfil.insignias && editableDatosPerfil.insignias.length > 0 ? (
                                        editableDatosPerfil.insignias.map((element, index) => (
                                            <div key={'Insig-' + index} className="col-3 col-md-2 col-xl-1 caja-img">
                                                <img src={insignias[element.avatar]} alt={element.nombre} className="avatares-perfil" title={element.nombre} />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="col-12">No hay insignias disponibles.</p>
                                    )}
                                </div>
                                <div className="row caja-general">
                                    <h2 className="col-12 p-0">Cuentas</h2>
                                    {editableDatosPerfil && editableDatosPerfil.cuentas && editableDatosPerfil.cuentas.length > 0 ? (
                                        <>
                                            {editableDatosPerfil.cuentas.map((element, index) => (
                                                <div key={'Cuen-' + index} className="col-3 col-md-2 col-xl-1 caja-img">
                                                    <a href={element.url} target="_blank" rel="noopener noreferrer">
                                                        <img src={imagenes[element.nombre]} alt={element.nombre} className="avatares-perfil" title={element.url} />
                                                    </a>
                                                </div>
                                            ))}
                                            <div className="col-3 col-md-2 col-xl-1 caja-img">
                                                <a rel="noopener noreferrer" className="caja-img" onClick={handleCtaClick}>
                                                    <img src={aniadir} alt="Añadir cuenta" className="avatares-perfil aniadir" title="Añadir cuenta" style={{ cursor: "pointer" }} />
                                                </a>
                                            </div>
                                        </>

                                    ) : (
                                        <div className="col-3 col-md-2 col-xl-1 caja-img">
                                            <a rel="noopener noreferrer" className="caja-img" onClick={handleCtaClick}>
                                                <img src={aniadir} alt="Añadir cuenta" className="avatares-perfil aniadir" title="Añadir cuenta" style={{ cursor: "pointer" }} />
                                            </a>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <label className="col-12 col-lg-4 mt-3">
                            <p style={{ marginBottom: '0px' }}>Usuario:</p>
                            <input
                                type="text"
                                name="usuario"
                                value={editableDatosPerfil.usuario || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '5px' }}
                                disabled={true}
                            />
                        </label>
                        <label className="col-12 col-lg-4 mt-3">
                            <p style={{ marginBottom: '0px' }}>Nombre:</p>
                            <input
                                type="text"
                                name="nombre"
                                value={editableDatosPerfil.nombre || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '5px' }}
                            />
                        </label>
                        <label className="col-12 col-lg-4 mt-3">
                            <p style={{ marginBottom: '0px' }}>Apellidos:</p>
                            <input
                                type="text"
                                name="apellidos"
                                value={editableDatosPerfil.apellidos || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '5px' }}
                            />
                        </label>
                        <label className="col-12 col-lg-6 mt-3">
                            <p style={{ marginBottom: '0px' }}>Centro Educativo:</p>
                            <input
                                type="text"
                                name="centro_educativo"
                                value={editableDatosPerfil.centro_educativo || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '5px' }}
                                disabled={true}
                            />
                        </label>
                        <label className="col-12 col-lg-6 mt-3">
                            <p style={{ marginBottom: '0px' }}>Email:</p>
                            <input
                                type="email"
                                name="email"
                                value={editableDatosPerfil.email || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '5px' }}
                            />
                        </label>
                        <label className="col-12 col-lg-6 mt-3">
                            <p style={{ marginBottom: '0px' }}>Sobre mi:</p>
                            <textarea
                                name="sobre_mi"
                                value={editableDatosPerfil.sobre_mi || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%', minHeight: '100px', padding: '5px' }}
                            />
                        </label>
                        <div className="row mt-3">
                            <div className="col-12 d-flex justify-content-start align-items-center">
                                <button className="boton d-felx justify-content-center align-items-center mt-3 mb-3 p-2" style={{ minWidth: '162px' }} onClick={actualizarDatosPerfil}>
                                    <span>Guardar</span>
                                </button>
                                <span className="col-1"></span>
                                {user.rol == 'profesor' ? (
                                    <button className="boton d-flex justify-content-center align-items-center mt-3 mb-3 p-2" style={{ minWidth: '162px' }} onClick={handleInvitacionClick}>
                                        <span>Enviar invitaciones</span>
                                    </button>
                                ) : editableDatosPerfil.formulario_realizado == 0 ? (
                                    <button className="boton d-flex justify-content-center align-items-center mt-3 mb-3 p-2" style={{ minWidth: '162px' }} onClick={handleFormClick}>
                                        <span>Realizar formulario</span>
                                    </button>
                                ) : null}


                            </div>

                        </div>
                    </div>
                </div>
            )}
            <ModalImgPerfil show={showImgModal} handleImgPerfil={handleImgPerfil} handleClose={handleImgClose} modoColor={modoColor} url={urlFoto}></ModalImgPerfil>
            <ModalCuentas show={showCtaModal} handleCtaPerfil={handleCtaPerfil} handleClose={handleCtaClose} modoColor={modoColor} catCuentas={editableDatosPerfil.cat_cuentas} cuentas={editableDatosPerfil.cuentas}></ModalCuentas>
            <ModalFormulario show={showFormModal} handleFormPerfil={handleFormPerfil} handleClose={handleFormClose} modoColor={modoColor} token={token}></ModalFormulario>
            <ModalInvitaciones show={showInvitacionModal} handleClose={handleInvitacionClose} modoColor={modoColor} token={token}></ModalInvitaciones>    
            { /* Mensaje de enviado */}
            {perfilActualizado === true && (
                <Alerta
                    mensaje="Perfil actualizado correctamente"
                    tipo={alertaTipo}>
                </Alerta>
            )}
        </div>

    );
}

export default Perfil;
