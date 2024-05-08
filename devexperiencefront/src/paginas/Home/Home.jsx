import React from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import SeccionHome from "../../componentes/seccionHome/SeccionHome.jsx";
import fotoSeccion1 from '../../assets/imgs/fotoHome.png';
import fotoSeccion2 from '../../assets/imgs/fotoHome2.png';
import fotoSeccion3 from '../../assets/imgs/fotoHome3.png';
import fotoSeccion4 from '../../assets/imgs/fotoHome4.png';

function Home(props) {
    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <SeccionHome 
                titulo="Descubre DevExperience: Tu aliado en el camino hacia las prácticas"
                texto="DevExperience es una plataforma esencial que brinda a los alumnos acceso  a información veraz y experiencias anteriores, incluyendo análisis  exhaustivos y opiniones sobre prácticas en el sector del desarrollo de  software. " 
                foto={fotoSeccion1}
                fotoDerecha={true}
                infoGuardada={props.infoGuardada}
                fondo="secundario"
            >
            </SeccionHome>
            <SeccionHome 
                titulo="Navega por Datos Clave del Sector"
                texto="DevExperience te ofrece acceso a estadísticas generales, permitiéndote  profundizar en tendencias del mercado, como las tecnologías más  demandadas, salarios promedio para principiantes, y mucho más. Esta  visión global te ayuda a entender el panorama actual del desarrollo de  software. " 
                foto={fotoSeccion2}
                fotoDerecha={false}
                infoGuardada={props.infoGuardada}
                fondo="principal"
            >
            </SeccionHome>
            <SeccionHome 
                titulo="Encuentra empresas en función de tus criterios"
                texto="Con DevExperience, personaliza tu búsqueda de empresas utilizando  filtros clave como valoraciones, tasa de contratación, opciones de  teletrabajo y las tecnologías que implementan. Esta funcionalidad te  garantiza encontrar opciones se ajustan a tus intereses y  habilidades. " 
                foto={fotoSeccion3}
                fotoDerecha={true}
                infoGuardada={props.infoGuardada}
                fondo="secundario"
            >
            </SeccionHome>
            <SeccionHome 
                titulo="¿Necesitas Ayuda? Visita Nuestro Soporte"
                texto="Si tienes más preguntas o necesitas asistencia, nuestro equipo de  soporte está aquí para ayudarte. No  dudes en contactarnos para obtener el soporte que necesitas y asegurar  la mejor experiencia con DevExperience. " 
                foto={fotoSeccion4}
                fotoDerecha={false}
                infoGuardada={props.infoGuardada}
                fondo="principal"
            >
            </SeccionHome>
        </div>
    );
}

export default Home;