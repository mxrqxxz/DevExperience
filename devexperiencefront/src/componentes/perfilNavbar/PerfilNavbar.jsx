import React, { useState } from 'react';
import './PerfilNavbar.css';  
import Avatar from '../../assets/imgs/Avatar.svg';
function PerfilNavbar() {

    // Simulación de datos del usuario
    const user = {
        name: 'Nombre del Usuario',
        imageUrl: Avatar,  // Puedes cambiar esto por la URL real
    };
    return (
        <div className="perfil-navbar">
            <img src={user.imageUrl} alt={user.name} className="user-image" />
        </div>
    );
}

export default PerfilNavbar;
