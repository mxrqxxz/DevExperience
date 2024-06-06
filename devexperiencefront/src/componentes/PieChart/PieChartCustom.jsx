import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import "./PieChartCustom.css";

function PieChartCustom(props) {

  const dataFinal = props.dataset.map((item, index) => {
    return {
      id: index,
      label: item.name,
      value: item.value,
    };
  });

  return (
    <div className='quesito'>
      <PieChart
        series={[
          {
            data: dataFinal,
          }
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}

export default PieChartCustom;