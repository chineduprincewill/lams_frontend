import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = ({ labels, data }) => {

    const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Patients in range',
            data: data,
            fill: false,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(75,192,192,1)',
          }
        ],
    };
    
    const options = {
        scales: {
            y: {
            beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />
}

export default LineChart