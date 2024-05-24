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

function Perfil(props) {
    const imagenes = {
        LinkedIn: linkedIn,
        Github: github
    };
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || null;
    const { datosPerfil, isLoading, error } = useDatosPerfil(token);
    const colores = useContext(ColoresContext);
    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");
    const [editableDatosPerfil, setEditableDatosPerfil] = useState(datosPerfil || {});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableDatosPerfil({ ...editableDatosPerfil, [name]: value });
    };
    const [showImgModal, setShowImgModal] = useState(false);

    const handleImgClick = () => {
        setShowImgModal(true);
    };
    const handleImgClose = () => {
        setShowImgModal(false);
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
        console.log(image);
    };
    const actualizarDatosPerfil = async () => {
        const res = await actualizarPerfil(token, editableDatosPerfil);
        if (res) {
            console.log("Perfil actualizado correctamente");
        } else {
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
        if (datosPerfil && datosPerfil.avatar !== null && datosPerfil.avatar !== "" && datosPerfil.avatar !== undefined && datosPerfil.avatar !== "url_example") {
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
                                                <img src={`http://devexperience.test/storage/Insignias/${element.avatar}`} alt={element.nombre} className="avatares-perfil" title={element.nombre} />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="col-12">No hay cuentas disponibles.</p>
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
                                                <a href="/ruta/para/agregar/cuenta" target="_blank" rel="noopener noreferrer" className="caja-img">
                                                    <img src={aniadir} alt="Añadir cuenta" className="avatares-perfil aniadir" title="Añadir cuenta" />
                                                </a>
                                            </div>
                                        </>

                                    ) : (
                                        <p className="col-12">No hay cuentas disponibles.</p>
                                    )}
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
                                    <button className="boton d-flex justify-content-center align-items-center mt-3 mb-3 p-2" style={{ minWidth: '162px' }}>
                                        <span>Enviar invitaciones</span>
                                    </button>
                                ) : (
                                    <button className="boton d-flex justify-content-center align-items-center mt-3 mb-3 p-2" style={{ minWidth: '162px' }}>
                                        <span>Realizar formulario</span>
                                    </button>
                                )}

                            </div>

                        </div>
                    </div>
                </div>
            )}
            <ModalImgPerfil show={showImgModal} handleImgPerfil={handleImgPerfil} handleClose={handleImgClose} modoColor={modoColor} url={urlFoto}></ModalImgPerfil>
        </div>

    );
}

export default Perfil;
