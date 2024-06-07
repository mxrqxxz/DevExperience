import React, { useEffect, useState, useContext } from "react";
import "./Empresa.css";
import ColoresContext from "../../contextos/ColoresContext.jsx";
import { useParams } from 'react-router-dom';
import Navbar from '../../componentes/navbar/Navbar.jsx';
import useEmpresa from "../../hooks/useEmpresa.jsx";
import fotoDefault from "../../assets/imgs/empresas/portadaEmpresa.jpg";
import PieChartCustom from "../../componentes/PieChart/PieChartCustom.jsx";
import BarChartCustom from "../../componentes/BarChart/BarChartCustom.jsx";
import Comentarios from "../../componentes/Comentarios/Comentarios.jsx";

function Empresa(props) {

    // Colores

    const colores = useContext(ColoresContext);
    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Dark" : "Light";
            setModoColor(newColorMode);
        };
        updateColorMode();
    }, [props.infoGuardada.darkmode]);

    // User

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || null;

    // Empresa

    const { idEmpresa } = useParams();

    const { listaDatos } = useEmpresa(token, idEmpresa);

    useEffect(() => {
        if (listaDatos !== null) {
            console.log(listaDatos);
        }
    }, [listaDatos]);

    const nota = Math.round(listaDatos?.cabecera?.val_media * 10) / 10;
    const colorNota = nota >= 8 ? "green" : nota >= 5 ? "yellow" : "red";

    // Asignamos una imagen default a la empresa
    const [imagenEmpresa, setImagenEmpresa] = useState(fotoDefault);

    useEffect(() => {
        // Comprobamos si la empresa tiene imagen propia
        if (listaDatos?.cabecera?.imagen !== null && listaDatos?.cabecera?.imagen !== "" && listaDatos?.cabecera?.imagen !== undefined && listaDatos?.cabecera?.imagen !== "url_example") {
            setImagenEmpresa("http://devexperience.test/storage/" + listaDatos?.cabecera?.imagen);
        }
    }, [listaDatos?.cabecera?.imagen]);

    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <div className="container-fluid p-0">
                <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.secundario }}>
                    <div className="col-12 p-5">
                        <div className="cabeceraEmpresa" style={{ backgroundColor: colores[modoColor].Fondos.terciario }}>
                            <div className="row">
                                <div className="col-5">
                                    <div className="centrarFoto">
                                        <img src={imagenEmpresa} alt="Logo de la empresa" className="fotoCabeceraEmpresa" />
                                    </div>
                                </div>
                                <div className="col-7">
                                    <h1 style={{ color: colores[modoColor].Texto.principal }}>{listaDatos?.cabecera?.nombre}</h1>
                                    <p className="textoCabeceraEmpresa" style={{ color: colores[modoColor].Texto.principal }}>Localización: {listaDatos?.cabecera?.localizacion}</p>
                                    <p className="textoCabeceraEmpresa" style={{ color: colores[modoColor].Texto.principal }}>Usuarios con experiencia en esta empresa: {listaDatos?.cabecera?.num_usuarios}</p>
                                    <p className="textoCabeceraEmpresa" style={{ color: colores[modoColor].Texto.principal }}>Valoración media: <span style={{ color: colorNota }}>{nota}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QUESITOS */}

                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro  separarAbajo">Remoto</h3>
                        {listaDatos !== null && <PieChartCustom dataset={listaDatos.estadisticas.remoto} />}
                    </div>
                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro separarAbajo">Front-end</h3>
                        {listaDatos !== null && <PieChartCustom dataset={listaDatos.estadisticas.front} />}
                    </div>
                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro separarAbajo">Back-end</h3>
                        {listaDatos !== null && <PieChartCustom dataset={listaDatos.estadisticas.back} />}
                    </div>
                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro separarAbajo">Control de versiones</h3>
                        {listaDatos !== null && <PieChartCustom dataset={listaDatos.estadisticas.control_versiones} />}
                    </div>
                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro separarAbajo">Base de datos</h3>
                        {listaDatos !== null && <PieChartCustom dataset={listaDatos.estadisticas.base_datos} />}
                    </div>
                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro separarAbajo">Jornada</h3>
                        {listaDatos !== null && <PieChartCustom dataset={listaDatos.estadisticas.jornada} />}
                    </div>

                    {/* VALORES NUMERICOS */}

                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro separarAbajo">Tasa de contratación</h3>
                        {listaDatos !== null && <p className="resaltar" style={{ color: colores[modoColor].Texto.principal }}>{listaDatos.estadisticas.tasa_contratacion} &#37;</p>}
                    </div>
                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro separarAbajo">Val. de formación</h3>
                        {listaDatos !== null && <p className="resaltar" style={{ color: colores[modoColor].Texto.principal }}>{listaDatos.estadisticas.val_formacion} </p>}
                    </div>
                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro separarAbajo">Val. de ambiente laboral</h3>
                        {listaDatos !== null && <p className="resaltar" style={{ color: colores[modoColor].Texto.principal }}>{listaDatos.estadisticas.val_ambiente_trabajo} </p>}
                    </div>
                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro separarAbajo">Salario Medio Anual</h3>
                        {listaDatos !== null && <p className="resaltar" style={{ color: colores[modoColor].Texto.principal }}>{listaDatos.estadisticas.salario_medio} &#8364;</p>}
                    </div>
                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro separarAbajo">Tiempo de descanso</h3>
                        {listaDatos !== null && <p className="resaltar" style={{ color: colores[modoColor].Texto.principal }}>{listaDatos.estadisticas.tiempo_descanso} </p>}
                    </div>
                    <div className="col-12 col-md-4">
                        <h3 className="text-center azulClaro separarAbajo">Equipo de trabajo</h3>
                        {listaDatos !== null && <p className="resaltar" style={{ color: colores[modoColor].Texto.principal }}>{listaDatos.estadisticas.equipo_trabajo} &#37;</p>}
                    </div>

                    {/* Gráficos de barras */}
                    {/* Unidad de medida es el simbolo de porcentaje */}

                    <div className="col-12">
                        <h3 className="text-center azulClaro separarAbajo">Hora de entrada</h3>
                        <div className="alinearIzquierda">
                            {listaDatos !== null && <BarChartCustom data={listaDatos.estadisticas.hora_entrada} unidadMedida=" &#37;" />}
                        </div>
                    </div>
                    <div className="col-12">
                        <h3 className="text-center azulClaro separarAbajo">Hora de entrada</h3>
                        <div className="alinearIzquierda">
                            {listaDatos !== null && <BarChartCustom data={listaDatos.estadisticas.hora_salida} unidadMedida=" &#37;" />}
                        </div>
                    </div>

                    {/* Sección de comentarios */}

                    {listaDatos !== null &&<Comentarios modoColor={modoColor} comentarios={listaDatos.comentarios} destinoNuevoComentario={idEmpresa}/>}
                </div>
            </div>
        </div>
    );
}

export default Empresa;