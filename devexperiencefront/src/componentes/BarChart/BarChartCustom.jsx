import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import "./BarChartCustom.css"

function BarChartCustom(props) {
    const chartSetting = {
        xAxis: [],
        width: 700,
        height: 400,
        margin: { top: 20, right: 20, bottom: 50, left: 300 } // Ajusta los márgenes según sea necesario
    };

    const valueFormatter = (value) => `${value + props.unidadMedida}`;

    return (
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
            {...chartSetting}
            xAxis={[
                {
                    colorMap: {
                        type: 'continuous',
                        color: ['#149ECA', '#149ECA']
                    }
                }
            ]}
            borderRadius={5}
            upAxis={null}
        />
    );

}

export default BarChartCustom;