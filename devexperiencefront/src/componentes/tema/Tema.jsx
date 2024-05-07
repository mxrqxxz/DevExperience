import React from "react";
import './tema.css'
import logoClaro from '../../assets/imgs/LightMode.svg'
import logoOscuro from '../../assets/imgs/DarkMode.svg'

function Tema(props) {

    function cambiarTema() {
        props.cambiarDarkmode();
    }

    return (
        <div>
            <button onClick={cambiarTema} className="botonModo">
                {props.tema === true ? <img src={logoClaro} alt="Modo claro" /> : <img src={logoOscuro} alt="Modo oscuro" className="logoModo"/>}
            </button>
        </div>
    );
}

export default Tema;