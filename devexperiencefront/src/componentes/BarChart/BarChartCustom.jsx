import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import "./BarChartCustom.css"

function BarChartCustom(props) {
    const chartSettingGrande = {
        xAxis: [],
        width: 700,
        height: 400,
        margin: { top: 20, right: 20, bottom: 50, left: 300 } // Ajusta los márgenes según sea necesario
    };

    const chartSettingPequeno = {
        xAxis: [],
        width: 500,
        height: 400,
        margin: { top: 20, right: 20, bottom: 50, left: 20 }
    }

    const valueFormatter = (value) => `${value + props.unidadMedida}`;

    return (
        <>
            {/* Pantalla pequeña */}
            <div className='d-lg-none'>
                <BarChart
                    dataset={props.data}
                    yAxis={[
                        {
                            scaleType: 'band',
                            dataKey: 'name',
                            axisTick: { show: true },
                            axisLabel: {
                                formatter: (value) => value,
                                rotate: 0, // 0 para textos horizontales o 45/90 para rotar
                                textStyle: {
                                    fontSize: 12,
                                    margin: 0 // Sirve para ajustar el margen del texto
                                }
                            }
                        }
                    ]}
                    series={[{ dataKey: 'value', valueFormatter, color: '#149ECA' }]}
                    layout="horizontal"
                    {...chartSettingPequeno}
                    xAxis={[
                        {
                            colorMap: {
                                type: 'continuous',
                                color: ['#149ECA', '#149ECA']
                            }
                        }
                    ]}
                    borderRadius={5}
                    leftAxis={null}
                />
            </div>
            {/* Pantalla grande */}
            <div className='d-none d-lg-block'>
            <BarChart
                dataset={props.data}
                yAxis={[
                    {
                        scaleType: 'band',
                        dataKey: 'name',
                        axisTick: { show: true },
                        axisLabel: {
                            formatter: (value) => value,
                            rotate: 0, // 0 para textos horizontales o 45/90 para rotar
                            textStyle: {
                                fontSize: 12,
                                margin: 0 // Sirve para ajustar el margen del texto
                            }
                        }
                    }
                ]}
                series={[{ dataKey: 'value', valueFormatter, color: '#149ECA' }]}
                layout="horizontal"
                {...chartSettingGrande}
                xAxis={[
                    {
                        colorMap: {
                            type: 'continuous',
                            color: ['#149ECA', '#149ECA']
                        }
                    }
                ]}
                borderRadius={5}
            />
        </div>
        </>
    );

}

export default BarChartCustom;