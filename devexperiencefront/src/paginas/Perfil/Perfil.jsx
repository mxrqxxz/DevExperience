import React, { useContext, useState, useEffect } from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import useDatosPerfil from '../../hooks/useDatosPerfil.jsx';
import ColoresContext from "../../contextos/ColoresContext.jsx";
import linkedIn from '../../assets//imgs/tecnologias/icons8-linkedin.svg';
import github from '../../assets/imgs/tecnologias/icons8-github.svg';
import './Perfil.css';
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
                        <div className="col-4 col-xl-3 p-0 d-flex justify-content-center align-items-center">
                            <img
                                className="img-fluid imgPerfil"
                                src={datosPerfil.avatar}
                                alt="Foto de perfil"
                            />
                        </div>
                        <div className="col-8 col-xl-9 p-0 d-flex align-items-center">
                            <div className="row">
                                <div className="row caja-general">
                                    <h2 className="col-12 p-0">Insignias</h2>
                                    {editableDatosPerfil && editableDatosPerfil.insignias && editableDatosPerfil.insignias.length > 0 ? (
                                        editableDatosPerfil.insignias.map((element, index) => (
                                            <div key={'Insig-' + index} className="col-3 col-md-2 col-xl-1 caja-img">
                                                <img src={element.avatar} alt={element.nombre} className="avatares-perfil" />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="col-12">No hay cuentas disponibles.</p>
                                    )}
                                </div>
                                <div className="row caja-general">
                                    <h2 className="col-12 p-0">Cuentas</h2>
                                    {editableDatosPerfil && editableDatosPerfil.cuentas && editableDatosPerfil.cuentas.length > 0 ? (
                                        editableDatosPerfil.cuentas.map((element, index) => (
                                            <div key={'Cuen-' + index} className="col-3 col-md-2 col-xl-1 caja-img">
                                                <img src={imagenes[element.nombre]} alt={element.nombre} className="avatares-perfil" />
                                            </div>
                                        ))
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
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label className="col-12 col-lg-4 mt-3">
                            <p style={{ marginBottom: '0px' }}>Nombre:</p>
                            <input
                                type="text"
                                name="nombre"
                                value={editableDatosPerfil.nombre || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label className="col-12 col-lg-4 mt-3">
                            <p style={{ marginBottom: '0px' }}>Apellidos:</p>
                            <input
                                type="text"
                                name="apellidos"
                                value={editableDatosPerfil.apellidos || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label className="col-12 col-lg-6 mt-3">
                            <p style={{ marginBottom: '0px' }}>Centro Educativo:</p>
                            <input
                                type="text"
                                name="centro_educativo"
                                value={editableDatosPerfil.centro_educativo || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label className="col-12 col-lg-6 mt-3">
                            <p style={{ marginBottom: '0px' }}>Email:</p>
                            <input
                                type="email"
                                name="email"
                                value={editableDatosPerfil.email || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label className="col-12 mt-3">
                            <p style={{ marginBottom: '0px' }}>Sobre mi:</p>
                            <input
                                type="text"
                                name="sobre_mi"
                                value={editableDatosPerfil.sobre_mi || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Perfil;
