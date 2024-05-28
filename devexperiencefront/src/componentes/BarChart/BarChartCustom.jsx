import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import "./BarChartCustom.css"

function BarChartCustom(props) {
    const chartSetting = {
        xAxis: [
            {
                label: 'uso (%)',
            },
        ],
        width: 500,
        height: 400
    };

    const valueFormatter = (value) => `${value}%`;

    return (
            <BarChart
            dataset={props.data}
            yAxis={[{ scaleType: 'band', dataKey: 'name' }]}
            series={[{ dataKey: 'value', valueFormatter, color: '#149ECA' }]}
            layout="horizontal"
            {...chartSetting}
            xAxis={[
                {
                    colorMap: {
                        type: 'continuous',
                        color: ['#087EA4', '#149ECA']
                    },
                    min: 0,
                    max: 100,
                }
            ]}
            borderRadius={5}
            upAxis={null}
        />
    );

}

export default BarChartCustom;