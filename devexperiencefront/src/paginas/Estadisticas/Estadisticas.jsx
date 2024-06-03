import React, { useContext, useEffect, useState } from "react";
import Navbar from '../../componentes/navbar/Navbar.jsx';
import ColoresContext from "../../contextos/ColoresContext";
import BarChartCustom from "../../componentes/BarChart/BarChartCustom.jsx";
import useEstadisticasGenerales from "../../hooks/useEstadisticasGenerales";
import "./Estadisticas.css";
import desarrolloBlanco from "../../assets/imgs/iconosEstadisticas/dblanco.png"
import desarrolloNegro from "../../assets/imgs/iconosEstadisticas/dnegro.png"
import relojBlanco from "../../assets/imgs/iconosEstadisticas/horarios 1.png"
import relojNegro from "../../assets/imgs/iconosEstadisticas/horarios 2.png"
import oficinaNegro from "../../assets/imgs/iconosEstadisticas/oficina 2.png"
import oficinaBlanco from "../../assets/imgs/iconosEstadisticas/oficina 1.png"
import gorroBlanco from "../../assets/imgs/iconosEstadisticas/gorro 1.png"
import gorroNegro from "../../assets/imgs/iconosEstadisticas/gorro 2.png"

function Estadisticas(props) {

    const colores = useContext(ColoresContext);

    const [modoColor, setModoColor] = useState(props.infoGuardada.darkmode ? "Dark" : "Light");

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Dark" : "Light";
            setModoColor(newColorMode);
        };

        updateColorMode();
    }, [props.infoGuardada.darkmode]);

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.infoGuardada.darkmode ? "Light" : "Dark";
        };

        updateColorMode();
    }, [modoColor]);

    const { listaDatos } = useEstadisticasGenerales();

    // LÓGICA DE LA BARRA LATERAL

    const [clickedIndex, setClickedIndex] = useState(0); // Marca por default el primer item de la barra lateral
    const handleItemClick = (index, item) => {
        setClickedIndex(index);
        seccionGraficos(item);
    };

    const items = ['TECNOLOGÍAS', 'EMPRESAS', 'CENTROS', 'HORARIOS'];

    function sacarIcono(item, index) {
        switch (item) {
            case 'TECNOLOGÍAS':
                return <img
                    style={{
                        backgroundColor: clickedIndex === index ? '#149ECA' : 'transparent',
                    }}
                    key={index}
                    src={modoColor === 'Light' ? desarrolloNegro : desarrolloBlanco}
                    alt="Tecnologías"
                    className="iconoLateral"
                    onClick={() => handleItemClick(index, item)}
                />

            case 'EMPRESAS':
                return <img
                    style={{
                        color: colores[modoColor].Texto.principal,
                        backgroundColor: clickedIndex === index ? '#149ECA' : 'transparent',
                    }}
                    key={index}
                    src={modoColor === 'Light' ? oficinaNegro : oficinaBlanco}
                    alt="Empresas"
                    className="iconoLateral"
                    onClick={() => handleItemClick(index, item)}
                />
            case 'CENTROS':
                return <img
                    style={{
                        color: colores[modoColor].Texto.principal,
                        backgroundColor: clickedIndex === index ? '#149ECA' : 'transparent',
                    }}
                    key={index}
                    src={modoColor === 'Light' ? gorroNegro : gorroBlanco}
                    alt="gorro"
                    className="iconoLateral"
                    onClick={() => handleItemClick(index, item)}
                />
            case 'HORARIOS':
                return <img
                    style={{
                        color: colores[modoColor].Texto.principal,
                        backgroundColor: clickedIndex === index ? '#149ECA' : 'transparent',
                    }} 
                    key={index} 
                    src={modoColor === 'Light' ? relojNegro : relojBlanco} 
                    alt="reloj" 
                    className="iconoLateral" 
                    onClick={() => handleItemClick(index, item)} />
            default:
                break;
        }

    }

    // LÓGICA CARGAR GRÁFICOS

    const [selectedGraphData, setSelectedGraphData] = useState(null);
    const [unidadMedida, setUnidadMedida] = useState(null);
    const [maxValue, setMaxValue] = useState(null);
    const [titulos, setTitulos] = useState([]);

    function seccionGraficos(titulo) {
        switch (titulo) {
            case 'TECNOLOGÍAS':
                setSelectedGraphData(listaDatos.estadisticas_tecnologias);
                setUnidadMedida(' %');
                setTitulos(['FRONT-END', 'BACK-END', 'BASE DE DATOS', 'CONTROL DE VERSIONES']);
                break;
            case 'EMPRESAS':
                setSelectedGraphData(listaDatos.estadisticas_empresas);
                setUnidadMedida(' %');
                setTitulos(['PRÁCTICAS (%)', 'PORCENTAJE DE LAS CONTRATACIONES TOTALES', 'SALARIOS', 'REMOTO (%)']);
                break;
            case 'CENTROS':
                setSelectedGraphData(listaDatos.estadisticas_centros);
                setUnidadMedida(' %');
                setTitulos(['CON MÁS CONTRATACIONES (%)', 'MEDIA DE SALARIOS MÁS ALTOS', 'PRÁCTICAS EN REMOTO', 'EMPRESAS ASOCIADAS (%)']);
                break;
            case 'HORARIOS':
                setSelectedGraphData(listaDatos.estadisticas_horarios);
                setUnidadMedida(' %');
                setTitulos(['HORA DE ENTRADA (%)', 'HORA DE SALIDA (%)', 'TIPO DE JORNADA', 'TIEMPO DE DESCANSO (%)']);
                break;
            default:
                setSelectedGraphData(null);
                setUnidadMedida('');
                setTitulos([]);
                break;
        }
    }

    function renderCharts(data) {
        if (!data) return null;
        return Object.keys(data).map((key, index) => (
            <>
                <h3 style={{ color: colores[modoColor].Texto.principal }} className="tituloGrafico">{titulos[index]}</h3>
                <BarChartCustom key={index} data={data[key]} unidadMedida={unidadMedida} maxValue={maxValue} />
                <hr style={{ color: colores[modoColor].Texto.principal }} />
            </>
        ));
    }

    useEffect(() => {
        setSelectedGraphData(listaDatos.estadisticas_tecnologias);
        setUnidadMedida(' %');
        setTitulos(['FRONT-END', 'BACK-END', 'BASE DE DATOS', 'CONTROL DE VERSIONES']);
    }, [selectedGraphData == null]);

    return (
        <div>
            <Navbar infoGuardada={props.infoGuardada} cambiarDarkmode={props.cambiarDarkmode}></Navbar>
            <div className="container-fluid p-0">
                <div className="row" style={{ backgroundColor: colores[modoColor].Fondos.secundario }}>
                    <div className="col-3">
                        <div className="barraLateral">
                            {/* TITULOS DE LA BARRA LATERAL */}
                            <div className="d-none d-md-block grupoTitulos">
                                {items.map((item, index) => (
                                    <p
                                        key={index}
                                        className="tituloLateral"
                                        style={{
                                            color: colores[modoColor].Texto.principal,
                                            backgroundColor: clickedIndex === index ? '#149ECA' : 'transparent',
                                        }}
                                        onClick={() => handleItemClick(index, item)}
                                    >
                                        <strong>
                                            {item}
                                        </strong>
                                    </p>
                                ))}
                            </div>

                            <div className="d-block d-md-none grupoTitulos">
                                {items.map((item, index) => (
                                    sacarIcono(item, index)
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-9 p-0">
                        <div className="seccionEstadistica">
                            <div className="grafico">
                                {renderCharts(selectedGraphData)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12" style={{ backgroundColor: colores[modoColor].Fondos.footer }}>
                        <p style={{ color: colores[modoColor].Texto.principal }} className="pFooter" >&#169; DevExperience | Diseñado por: Manuel Fernández y Jesús Rial | Proyecto TFG DAW 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Estadisticas;