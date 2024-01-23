import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const BarChart = ({ data }) => {
    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return <Pie data={data} options={options} />;
}

export default BarChart;
