import React, { useContext, useState, useEffect } from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import useDatosPerfil from '../../hooks/useDatosPerfil.jsx';
import ColoresContext from "../../contextos/ColoresContext.jsx";
import './Perfil.css';
function Perfil(props) {
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
        <div className="container-fluid" style={{ minHeight: '100vh', backgroundColor: colores[modoColor].Fondos.secundario, color: colores[modoColor].Texto.principal, padding:0 }}>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode} />
            {editableDatosPerfil && (
                <div className="row datosPerfil d-flex justify-content-center" >
                    <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.principal }}>
                        <img className="col-6" style={{borderRadius: '100%' }} src={datosPerfil.avatar} alt="Foto de pergil" />
                    </div>
                    <div className="row">
                    <label className="col-12 col-lg-4">
                           <p>Usuario:</p> 
                            <input
                                type="text"
                                name="usuario"
                                value={editableDatosPerfil.usuario || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label className="col-12 col-lg-4">
                           <p>Nombre:</p> 
                            <input
                                type="text"
                                name="nombre"
                                value={editableDatosPerfil.nombre || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label className="col-12 col-lg-4">
                            <p>Apellidos:</p>
                            <input
                                type="text"
                                name="apellidos"
                                value={editableDatosPerfil.apellidos || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label className="col-12 col-lg-6">
                            <p>Centro Educativo:</p>
                            <input
                                type="text"
                                name="centro_educativo"
                                value={editableDatosPerfil.centro_educativo || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label className="col-12 col-lg-6">
                            <p>Email:</p>                           
                            <input
                                type="email"
                                name="email"
                                value={editableDatosPerfil.email || ''}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label className="col-12">
                            <p>Sobre mi:</p>                           
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
