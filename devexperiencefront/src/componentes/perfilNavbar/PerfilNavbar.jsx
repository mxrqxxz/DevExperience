import React, { useState, useContext, useEffect } from 'react';
import './PerfilNavbar.css';  
import Avatar from '../../assets/imgs/Avatar.svg';
import ColoresContext from "../../contextos/ColoresContext";
import { Link } from 'react-router-dom';
import Login from '../../paginas/Login/Login';
import { UserContext } from '../../contextos/UserContext';
import { useNavigate } from 'react-router-dom';
function PerfilNavbar(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(() => {
        const storedShowLoginModal = localStorage.getItem('showLoginModal');
        localStorage.removeItem('showLoginModal'); 
        return storedShowLoginModal === 'true';
    });
    const { usuario, cambiarUsuario } = useContext(UserContext);
    const colores = useContext(ColoresContext);
    const navigate = useNavigate();
    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleLoginClose = () => {
        setShowLoginModal(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [modoColor, setModoColor] = useState(props.tema ? "Dark" : "Light");
    const [colorEnlacePerfil, setColorEnlacePerfil] = useState(props.tema ? "black" : "white");

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.tema ? "Dark" : "Light";
            setModoColor(newColorMode);
            setColorEnlacePerfil(props.tema ? "black" : "white");
        };

        updateColorMode();
    }, [props.tema]);

    return (
        <div className="perfil-navbar">
            <img src={usuario ? usuario.imageUrl : Avatar} alt={usuario ? usuario.name : "Default Avatar"} className="user-image" onClick={toggleMenu} />
            
            <svg className={`dropdown-arrow ${isMenuOpen ? 'open' : ''}`} width="10" height="10" viewBox="0 0 16 16" fill={colores[modoColor].Flecha} xmlns="http://www.w3.org/2000/svg" onClick={toggleMenu}>
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        {console.log(usuario)}
            <div className="dropdown-menu" style={{ display: isMenuOpen ? "block" : "none", borderRadius:'10px',textAlign:'center', backgroundColor:props.tema ? colores.Light.Fondos.principal : colores.Dark.Fondos.principal, color: props.tema ? colores.Light.Texto.principal : colores.Dark.Texto.principal}}>
                {usuario ? (
                    <>
                        <div onClick={() => console.log('Ir al perfil')}>Perfil</div>
                        <div onClick={() => {cambiarUsuario(null); navigate('/');}}>Cerrar sesión</div>
                    </>
                ) : (
                    <>
                        <div onClick={handleLoginClick} ><Link className='enlaceNav' style={{color: colorEnlacePerfil}}>Iniciar sesión</Link></div>
                        <div onClick={() => console.log('Registrarse')}>Registrarse</div>
                    </>
                )}
            </div>
            <Login show={showLoginModal} handleClose={handleLoginClose} cambiarUsuario={cambiarUsuario} modoColor={modoColor}/>
        </div>
    );
}

export default PerfilNavbar;
