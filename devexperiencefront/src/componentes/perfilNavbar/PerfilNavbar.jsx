import React, { useState, useContext, useEffect } from 'react';
import './PerfilNavbar.css';  
import Avatar from '../../assets/imgs/Avatar.svg';
import ColoresContext from "../../contextos/ColoresContext";
import { Link } from 'react-router-dom';
import Login from '../../paginas/Login/Login';
import { UserContext } from '../../contextos/UserContext';
import { useNavigate } from 'react-router-dom';
import Register from '../../paginas/Register/Register';
function PerfilNavbar(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(() => {
        const storedShowLoginModal = localStorage.getItem('showLoginModal');
        localStorage.removeItem('showLoginModal'); 
        return storedShowLoginModal === 'true';
    });
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const { usuario, cambiarUsuario } = useContext(UserContext);
    const colores = useContext(ColoresContext);
    const navigate = useNavigate();
    const handleLoginClick = () => {
        setShowLoginModal(true);
        setIsMenuOpen(!isMenuOpen);

    };

    const handleLoginClose = () => {
        setShowLoginModal(false);
    };
    const handleRegisterClick = () => {
        setShowRegisterModal(true);
        setIsMenuOpen(!isMenuOpen);

    };
    const handleRegisterClose = () => {
        setShowRegisterModal(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [modoColor, setModoColor] = useState(props.tema ? "Dark" : "Light");

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.tema ? "Dark" : "Light";
            setModoColor(newColorMode);
        };

        updateColorMode();
    }, [props.tema]);

    return (
        <div className="perfil-navbar">
            <img src={usuario ? usuario.foto : Avatar} alt={"Foto de perfil"} className="user-image" onClick={toggleMenu} />
            
            <svg className={`dropdown-arrow ${isMenuOpen ? 'open' : ''}`} width="10" height="10" viewBox="0 0 16 16" fill={colores[modoColor].Flecha} xmlns="http://www.w3.org/2000/svg" onClick={toggleMenu}>
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        {console.log(usuario)}
            <div className="dropdown-menu" style={{ display: isMenuOpen ? "block" : "none", borderRadius:'10px',textAlign:'center', backgroundColor:props.tema ? colores.Light.Fondos.principal : colores.Dark.Fondos.principal, color: props.tema ? colores.Light.Texto.principal : colores.Dark.Texto.principal}}>
                {usuario ? (
                    <>
                        <div className='drop-enlace' onClick={() => navigate('/perfil')}>Perfil</div>
                        <div className='drop-enlace' onClick={() => {cambiarUsuario(null); navigate('/');setIsMenuOpen(!isMenuOpen)}}>Cerrar sesión</div>
                    </>
                ) : (
                    <>
                        <div className='drop-enlace' onClick={handleLoginClick}>Iniciar sesión</div>
                        <div className='drop-enlace' onClick={handleRegisterClick}>Registrarse</div>
                    </>
                )}
            </div>
            <Login show={showLoginModal} handleClose={handleLoginClose} cambiarUsuario={cambiarUsuario} modoColor={modoColor}/>
            <Register show={showRegisterModal} handleClose={handleRegisterClose} cambiarUsuario={cambiarUsuario} modoColor={modoColor}/>
        </div>
    );
}

export default PerfilNavbar;
