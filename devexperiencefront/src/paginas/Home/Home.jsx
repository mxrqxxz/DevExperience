import React, { useEffect, useContext, useState } from "react";
import './Home.css';
import ColoresContext from "../../contextos/ColoresContext";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import SeccionHome from "../../componentes/seccionHome/SeccionHome.jsx";
import fotoSeccion1 from '../../assets/imgs/fotoHome.png';
import fotoSeccion2 from '../../assets/imgs/fotoHome2.png';
import fotoSeccion3 from '../../assets/imgs/fotoHome3.png';
import fotoSeccion4 from '../../assets/imgs/fotoHome4.png';
import Parallax from '../../componentes/parallax/Parallax.jsx';
import useDatosTotales from "../../hooks/useDatosTotales.jsx";
import CardHome from "../../componentes/cardHome/CardHome.jsx";
import CardComentarios from '../../assets/imgs/cardComentarios.png';
import CardUsuarios from '../../assets/imgs/cardUsuarios.png';
import CardEmpresas from '../../assets/imgs/cardEmpresas.png';
import { CarouselHome } from "../../componentes/carousel/CarouselHome.jsx";

function Home(props) {

    const colores = useContext(ColoresContext);

    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Dark" : "Light";
            setModoColor(newColorMode);
            console.log('cambio de color');
        };

        updateColorMode();
    }, [props.infoGuardada.darkmode]);


    const { listaDatos } = useDatosTotales();

    return (
        <div>
            <Parallax></Parallax>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode} ></Navbar>
            <div className="container-fluid">
                <SeccionHome
                    titulo="Descubre DevExperience: Tu aliado en el camino hacia las prácticas"
                    texto="DevExperience es una plataforma esencial que brinda a los alumnos acceso  a información veraz y experiencias anteriores, incluyendo análisis  exhaustivos y opiniones sobre prácticas en el sector del desarrollo de  software. "
                    foto={fotoSeccion1}
                    fotoDerecha={true}
                    infoGuardada={props.infoGuardada}
                    fondo="secundario"
                    aparicion="fade-right"
                >
                </SeccionHome>
                <SeccionHome
                    titulo="Navega por Datos Clave del Sector"
                    texto="DevExperience te ofrece acceso a estadísticas generales, permitiéndote  profundizar en tendencias del mercado, como las tecnologías más  demandadas, salarios promedio para principiantes, y mucho más. Esta  visión global te ayuda a entender el panorama actual del desarrollo de  software. "
                    foto={fotoSeccion2}
                    fotoDerecha={false}
                    infoGuardada={props.infoGuardada}
                    fondo="principal"
                    boton={{ enlace: "/estadisticas", contenido: "DESCUBRE MÁS" }}
                    aparicion="fade-left"
                >
                </SeccionHome>
                <SeccionHome
                    titulo="Encuentra empresas en función de tus criterios"
                    texto="Con DevExperience, personaliza tu búsqueda de empresas utilizando  filtros clave como valoraciones, tasa de contratación, opciones de  teletrabajo y las tecnologías que implementan. Esta funcionalidad te  garantiza encontrar opciones se ajustan a tus intereses y  habilidades. "
                    foto={fotoSeccion3}
                    fotoDerecha={true}
                    infoGuardada={props.infoGuardada}
                    fondo="secundario"
                    boton={{ enlace: "/empresas", contenido: "ENCUENTRA TU EMPRESA" }}
                    aparicion="fade-right"
                >
                </SeccionHome>
                <SeccionHome
                    titulo="¿Necesitas Ayuda? Visita Nuestro Soporte"
                    texto="Si tienes más preguntas o necesitas asistencia, nuestro equipo de  soporte está aquí para ayudarte. No  dudes en contactarnos para obtener el soporte que necesitas y asegurar  la mejor experiencia con DevExperience. "
                    foto={fotoSeccion4}
                    fotoDerecha={false}
                    infoGuardada={props.infoGuardada}
                    fondo="principal"
                    boton={{ enlace: "/soporte", contenido: "CONTÁCTANOS" }}
                    aparicion="fade-left"
                >
                </SeccionHome>
                <div className=" row text-center" style={{ backgroundColor: colores[modoColor].Fondos.secundario }}>
                    <div className="col-12 caja-carousel">
                        <h1 style={{ color: colores[modoColor].Titulos.principal, marginBottom:'20px' }}>TECNOLOGÍAS MÁS UTILIZADAS</h1>
                        <p className="text-carousel" style={{ color: colores[modoColor].Texto.principal, marginBottom:'20px' }}>Accede a nuestras estadísticas y datos para tomar decisiones informadas y mejorar tu trayectoria profesional.</p>
                        <CarouselHome porcentajes={listaDatos.porcentajeTecnologias} color={modoColor}></CarouselHome>
                    </div>
                </div>
                <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.footer }} >
                    <div className="col-2">
                        <div className="linea">
                            <hr />
                        </div>
                    </div>
                    <div className="col-8">
                        <h1 style={{ color: colores[modoColor].Texto.principal }} className="p-4 text-center">USO ACTUAL DE LA APLICACIÓN</h1>
                    </div>
                    <div className="col-2">
                        <div className="linea">
                            <hr />
                        </div>
                    </div>
                    <CardHome foto={CardEmpresas} titulo="EMPRESAS" texto={listaDatos.datosTotales.empresas} alineacion="justify-content-md-end" />
                    <CardHome foto={CardUsuarios} titulo="USUARIOS" texto={listaDatos.datosTotales.usuarios} alineacion="justify-content-md-center" />
                    <CardHome foto={CardComentarios} titulo="RESEÑAS" texto={listaDatos.datosTotales.comentarios} alineacion="justify-content-md-start" />
                    <div className="col-2">
                        <div className="linea">
                            <hr />
                        </div>
                    </div>
                    <div className="col-8" style={{ color: colores[modoColor].Texto.principal }}>
                    <h2 className="text-center">¿Cómo nace DevExperience?</h2>
                    </div>
                    <div className="col-2">
                        <div className="linea">
                            <hr />
                        </div>
                    </div>
                    <div className="col-12" style={{ color: colores[modoColor].Texto.principal }}>
                        <p className="text-center">Este proyecto ha surgido de nuestras propias dudas sin resolver e inseguridades que han ido apareciendo a lo largo de curso mientras se acercaban las prácticas. El no saber a que tecnologías realmente ibamos a enfrentarnos ni tener una opinión real de la empresa a la que vamos a pasar muchas horas nos hizo crear una aplicación que pueda ayudar a alumnos futuros con los mismos problemas.
                            DevExperience es el reflejo del espíritu colaborativo de la comunidad de desarrolladores, forjando juntos el futuro del software</p>
                        <p className="text-center" style={{ color: colores[modoColor].Texto.terciario }}>
                            © DevExperience
                            Diseñado por: Manuel Fernández y Jesús Rial
                            Proyecto TFG DAW 2024
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;