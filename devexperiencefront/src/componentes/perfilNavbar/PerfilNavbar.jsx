import React, { useState,useContext, useEffect } from 'react';
import './PerfilNavbar.css';  
import Avatar from '../../assets/imgs/Avatar.svg';
import ColoresContext from "../../contextos/ColoresContext";
import { Link } from 'react-router-dom';

function PerfilNavbar(props) {
    // Estado para manejar la visibilidad del menú desplegable
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const colores = useContext(ColoresContext);

    // Simulación de datos del usuario
   
    const user = null;

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
            <img src={user ? user.imageUrl : Avatar} alt={user ? user.name : "Default Avatar"} className="user-image" onClick={toggleMenu} />
            
            <svg className={`dropdown-arrow ${isMenuOpen ? 'open' : ''}`} width="10" height="10" viewBox="0 0 16 16" fill={colores[modoColor].Flecha} xmlns="http://www.w3.org/2000/svg" onClick={toggleMenu}>
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>

            <div className="dropdown-menu" style={{ display: isMenuOpen ? "block" : "none", borderRadius:'10px',textAlign:'center', backgroundColor:props.tema ? colores.Light.Fondos.principal : colores.Dark.Fondos.principal, color: props.tema ? colores.Light.Texto.principal : colores.Dark.Texto.principal}}>
                {user ? (
                    <>
                        <div onClick={() => console.log('Ir al perfil')}>Perfil</div>
                        <div onClick={() => console.log('Cerrar sesión')}>Cerrar sesión</div>
                    </>
                ) : (
                    <>
                        <div onClick={() => console.log('Logearse')}><Link className='enlaceNav' to="/login" style={{color: colorEnlacePerfil}}>Iniciar sesión</Link></div>
                        <div onClick={() => console.log('Registrarse')}>Registrarse</div>
                    </>
                )}
            </div>
        </div>
    );
    
}

export default PerfilNavbar;
